import Auth from "../Auth";
import axios from 'axios';

export default class Twitch extends Auth {

    constructor(type) {
        super(type);
        this.reponseType = 'token';
        this.scope = 'user:edit user:read:email';
        this.redirect_uri = process.env.REACT_APP_TWITCH_REDIRECT_URI;
        this.url = `https://id.twitch.tv/oauth2/authorize?response_type=${this.reponseType}&client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${this.redirect_uri}&scope=${this.scope}`
    }

    redirect() {
        window.location.replace(this.url);
    }

    async getAccessToken(path) {
        var url = new URL(`http://localhost:3000${path.pathname}${path.hash.replace('#', '?')}`);
        return url.searchParams.get('access_token') ?? null;
    }

    async getUserData() {
        const result = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${this.access_token}`,
                'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID
            }
        })
        const twitch_user = result.data.data[0];

        return { 
            email: twitch_user.email,
            username: twitch_user.display_name,
            [`${this.type}_id`]: {...twitch_user, access_token: this.access_token} 
        }
    }
}
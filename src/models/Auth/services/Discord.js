import Auth from "../Auth";
import axios from 'axios';

export default class Discord extends Auth {
    constructor(type) {
        super(type);
        this.discord_access = null;
        this.response_type = 'code';
        this.scope = 'identify%20email';
        this.redirect_uri = 'http://localhost:3000/auth/discord';
        this.url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${this.redirect_uri}&response_type=${this.response_type}&scope=${this.scope}`;
    }

    redirect() {
        window.location.replace(this.url);
    }

    async getAccessToken(path) {
        var url = new URL(`http://localhost:3000${path.pathname}${path.search}`);
        const code = url.searchParams.get('code');

        const params = new URLSearchParams();
        params.append('client_id', process.env.REACT_APP_DISCORD_CLIENT_ID)
        params.append('client_secret', process.env.REACT_APP_DISCORD_CLIENT_SECRET);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', this.redirect_uri);

        const result = await axios.post('https://discord.com/api/oauth2/token', params, {  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }, });
        this.discord_access = result.data;
    }

    async getUserData() {
        const discord_user = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${this.discord_access.access_token}`,
            }
        })

        return { 
            email: discord_user.data.email,
            username: discord_user.data.username,
            [`${this.type}_id`]: {...discord_user.data, ...this.discord_access}  
        }
    }
}
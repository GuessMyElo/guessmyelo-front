import axios from 'axios';

export default class Auth {
    constructor(type) {
        this.user = null;
        this.access_token = null;
        this.type = type;
    }

    redirect() {}

    async connect(path) {
        this.access_token = await this.getAccessToken(path);
        this.user = await this.getUserData();
    }

    async getAccessToken(path) {}
    
    async getUserData() {}
    
    async addUserToDatabase() {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                username: this.user.username,
                email: this.user.email,
                [`${this.type}_id`]: this.user[`${this.type}_id`],
                role: 'user',
                password: ""
            });
            return res.data;
        } catch (err) {
            if (err.response.data.errno === 1062) {
                const existingUser = await axios.get(`${process.env.REACT_APP_API_URL}/users/email/${this.user.email}`)
                return existingUser.data;
            }
        }
    }
}
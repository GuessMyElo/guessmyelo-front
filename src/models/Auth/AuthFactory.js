import Twitch from './services/Twitch';
import Discord from './services/Discord';
import AuthServiceEnum from './AuthServiceEnum';

export default class AuthFactory {
    createByType(type) {
        switch(type) {
            case AuthServiceEnum.DISCORD:
                return new Discord(type);
            case  AuthServiceEnum.TWITCH:
                return new Twitch(type);
            default:
                throw new Error("Invalid Auth Type");
        }
    }
}
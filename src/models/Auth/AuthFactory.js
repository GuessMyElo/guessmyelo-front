import Twitch from './services/Twitch';
import Discord from './services/Discord';
import AuthServiceEnum from './AuthServiceEnum';

export default class AuthFactory {
    createByType(type) {
        return {
            [AuthServiceEnum.DISCORD]: Discord,
            [AuthServiceEnum.TWITCH]: Twitch
        }[type];
    }
}
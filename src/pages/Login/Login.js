import { useRef } from 'react';
import Button from '@/shared/components/Button/Button';
import InputField from '@/shared/components/InputField/InputField';
import { Link } from 'react-router-dom';
import FloatingCard from 'shared/components/FloatingCard/FloatingCard';
import './Login.scss';
import { login, useAuthState, useAuthDispatch } from 'context/Auth';
import { useNavigate } from 'react-router';
import AuthFactory from 'models/Auth/AuthFactory';
import AuthServiceEnum from 'models/Auth/AuthServiceEnum';

export default function Login() {
    const identifier = useRef();
    const password = useRef();

    const navigate = useNavigate();
    const dispatch = useAuthDispatch()
    const { loading, errorMessage } = useAuthState()

    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = { auth: identifier.current.value, password: password.current.value };
        try {
            const res = await login(dispatch, payload);
            if (!res) return;
            navigate('/');
        } catch(err) {
            console.error(err);
        }
    }

    const startAuthProcess = (type) => {
        const service = new (new AuthFactory().createByType(type))(type)
        service.redirect();
    }

    return (
        <div className='login-container'>
            <FloatingCard>
                <h1>Login</h1>
                { errorMessage && <p>{errorMessage}</p> }
                <InputField placeholder="Email or Username" innerRef={identifier} />
                <InputField placeholder="Password" innerRef={password} />
                <Button onClick={handleLogin} disabled={loading}>Confirm</Button>
                <Link to="/register">
                    <Button reversed>Register</Button>
                </Link>
                <button onClick={() => startAuthProcess(AuthServiceEnum.TWITCH)}>Twitch</button>
                <button onClick={() => startAuthProcess(AuthServiceEnum.DISCORD)}>Discord</button>
            </FloatingCard>
        </div>
    )
}
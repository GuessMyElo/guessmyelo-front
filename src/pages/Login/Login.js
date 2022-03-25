import { useRef } from 'react';
import Button from '@/shared/components/Button/Button';
import TextField from '@/shared/components/TextField/TextField';
import { Link } from 'react-router-dom';
import FloatingCard from 'shared/components/FloatingCard/FloatingCard';
import './Login.scss';
import { login, useAuthState, useAuthDispatch } from 'context/Auth';
import { useNavigate } from 'react-router';

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
            console.log(res);
            if (!res) return;
            navigate('/');
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className='login-container'>
            <FloatingCard>
                <h1>Login</h1>
                { errorMessage && <p>{errorMessage}</p> }
                <TextField placeholder="Email or Username" innerRef={identifier} />
                <TextField placeholder="Password" innerRef={password} />
                <Button onClick={handleLogin} disabled={loading}>Confirm</Button>
                <Link to="/register">
                    <Button reversed>Register</Button>
                </Link>
            </FloatingCard>
        </div>
    )
}
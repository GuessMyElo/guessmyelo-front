import { useRef } from 'react';
import Button from '@/shared/components/Button/Button';
import TextField from '@/shared/components/TextField/TextField';
import { Link, useNavigate } from 'react-router-dom';
import FloatingCard from 'shared/components/FloatingCard/FloatingCard';
import axios from 'axios';
import './Register.scss';
import { useState } from 'react';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const handleRegister = async (e) => {
        e.preventDefault();

        const messages = [];
        const payload = {
            username: username.current.value, 
            email: email.current.value, 
            password: password.current.value,
            role: "user"
        };
        
        if (payload.username === '' || payload.email === '' || payload.password === '') {
            messages.push('Please fill all the fields');
        }

        if (payload.email !== '' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email)) {
            messages.push('Your email is not a valid format');
        }
        
        if (payload.password.length < 8) {
            messages.push('Your password should be at least 8 charaters long');
        }

        if (payload.password !== '' && payload.password !== confirmPassword.current.value) {
            messages.push('Your password and confirm password should be the same');
        }

        setErrors(messages);

        if (!errors.length > 0) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/add`, payload);
                if (!res.error) {
                    navigate('/login');
                }
            } catch(err) {
                console.error(err);
            }
        }
    }

    return (
        <div className='register-container'>
            <FloatingCard>
                <h1>Register</h1>
                <div id="errors">
                    {errors.length > 0 && errors.map((error, index) => (
                    <p key={index}>{error}</p>  
                    ))}
                </div>
                <TextField placeholder="Username" innerRef={username} />
                <TextField placeholder="Email" innerRef={email} />
                <TextField placeholder="Password" innerRef={password} />
                <TextField placeholder="Confirm password" innerRef={confirmPassword} />
                <Button onClick={handleRegister}>Send</Button>
                <Link to="/login">
                    <Button reversed>Login</Button>
                </Link>
            </FloatingCard>
        </div>
    )
}
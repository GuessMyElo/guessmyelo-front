import Button from '@/shared/components/Button/Button';
import TextField from '@/shared/components/TextField/TextField';
import { Link } from 'react-router-dom';
import FloatingCard from 'shared/components/FloatingCard/FloatingCard';
import './Register.scss';

export default function Register() {
    return (
        <div className='register-container'>
            <FloatingCard>
                <h1>Register</h1>
                <TextField placeholder="Username" />
                <TextField placeholder="Email" />
                <TextField placeholder="Password" />
                <TextField placeholder="Confirm password" />
                <Button>Send</Button>
                <Link to="/login">
                    <Button reversed>Login</Button>
                </Link>
            </FloatingCard>
        </div>
    )
}
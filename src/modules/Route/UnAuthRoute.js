import { useAuthState } from "context/Auth";
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthRoute({redirect}) {
    const auth = useAuthState();
    console.log(auth);

    if (auth.auth_token) {
        return <Navigate to={redirect} />
    }

    return <Outlet />
}
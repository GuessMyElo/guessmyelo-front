import { useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useAuthDispatch } from "context/Auth";
import AuthFactory from "models/Auth/AuthFactory";

export default function AuthRedirect() {
    const dispatch = useAuthDispatch();
    const location = useLocation();
    const params = useParams();
    
    useEffect(() => {
        dispatch({type: "REQUEST_LOGIN"});
        const service = new AuthFactory().createByType(params.type);
        service.connect(location).then(async () => {
            const savedUser = await service.addUserToDatabase();
            dispatch({type: "LOGIN_SUCCESS", payload: savedUser});
        });
    }, [])
    
    return (
        <></>
    )
}
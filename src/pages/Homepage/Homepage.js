import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import './Homepage.scss';
import { useAuthState } from "context/Auth";
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import Picture from '@/modules/Player/Avatar/atoms/Picture/Picture';
import Button from '@/shared/components/Button/Button';
import InputField from '@/shared/components/InputField/InputField';
import axios from 'axios';

export default function Homepage(){
    const auth = useAuthState();
    const navigate =  useNavigate();

    const createRoom = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL+'/rooms/create', {user_id: auth.user.id})
            .then((res) => navigate(`lobby/${res.data.room_id}`));
    }

    return (
        <div className='homepage-container'>
            <FloatingCard>
                <h1>Jouer</h1>
                <div className='avatar-container'>
                    <Picture src="images/player.jpg" size="130" />
                    <div className='avatar-select'>
                        <Button>Importer une photo</Button>
                        <div className='default-avatar'>
                            <Picture src="images/player.jpg" size="50" />
                            <Picture src="images/player.jpg" size="50" />
                            <Picture src="images/player.jpg" size="50" />
                        </div>
                    </div>
                </div>
                <form>
                    <InputField placeholder={auth.user ? auth.user.username : "Pseudo"} />
                    <div className='form-row'>
                        <InputField placeholder="Code de la partie" />
                        <Button>Rejoindre la partie</Button>
                    </div>
                    <Button onClick={createRoom}>Créer une partie</Button>
                    <Link to="/upload">
                        <Button reversed>Uploader une video</Button>
                    </Link>
                </form>
            </FloatingCard>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Scoreboard.scss';
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import ScoreboardItem from '@/modules/Informations/ScoreboardItem/molecules/ScoreboardItem';
import Button from '@/shared/components/Button/Button';
import { useSocket } from 'context/Socket/socket';
import { useAuthState } from 'context/Auth';
import axios from 'axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

export default function Scoreboard(){
    const [users, setUsers] = useState([]);
    const socket = useSocket();
    const params = useParams();
    const auth = useAuthState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/rooms/'+params.id)
            .then((res) => {
                socket.emit('request-game', params.id);
                socket.emit('calcul-point', params.id)
                socket.on('points-calculated', (data) => {
                    setUsers(data.users)
                })
                
            })
            .catch(() => navigate('/'))
    },[])

    return (
        <div className='scoreboard-container'>
            <FloatingCard>
                <h1>Classement</h1>
                <div className='scoreboard-list'>
                    {users.map((user, index) => (
                        <ScoreboardItem key={index} player={user.username} score={user.points} />
                    ))}
                </div>
                
                <div className='scoreboard-controls'>
                    <Link to="/">
                        <Button > Rejouer </Button>
                    </Link>
                    <Link to="/">
                        <Button> Quitter </Button>
                    </Link>
                </div>
            </FloatingCard>
        </div>
    )
}
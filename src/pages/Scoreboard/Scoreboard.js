import React, { useEffect } from 'react';
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
    const socket = useSocket();
    const params = useParams();
    const auth = useAuthState();
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/rooms/'+params.id)
            .then((res) => {
                socket.emit('join-room', {room_id: params.id, user: auth.user});
                socket.emit('request-game', params.id);
                socket.emit('calcul-point', params.id)
                socket.on('points-calculated', (data) => {
                    console.log("points-calculated", data)
                })
                
            })
            .catch(() => navigate('/'))
    },[])

    return (
        <div className='scoreboard-container'>
            <FloatingCard>
                <h1>Classement</h1>
                <div className='scoreboard-list'>
                    {new Array(10).fill(0).map((elem, index) => (
                        <ScoreboardItem key={index} player={"Kiz"} score={35} isEven={index % 2 === 0} />
                    ))}
                </div>
                
                <div className='scoreboard-controls'>
                    <Link to="/">
                        <Button> Rejouer </Button>
                    </Link>
                    <Link to="/">
                        <Button> Quitter </Button>
                    </Link>
                </div>
            </FloatingCard>
        </div>
    )
}
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import './Lobby.scss';
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import Button from '@/shared/components/Button/Button';
import SidePanel from 'modules/Gameplay/shared/components/SidePanel/SidePanel';
import Select from 'shared/components/Select/Select';
import { Capitalize } from 'Utils';
import InputField from 'shared/components/InputField/InputField';
import NamedAvatar from 'modules/Player/Avatar/molecules/NamedAvatar/NamedAvatar';
import { useAuthState } from "context/Auth";
import axios from 'axiosConfig';
import { useSocket } from 'context/Socket/socket';

export default function Lobby(){
    const [roomInfo, setRoomInfo] = useState({
        room_size: 3,
        nb_video : 5,
        nb_loop: 2,
        difficulty:'facile'
    });
    const [participants, setParticipants] = useState([]);
    const difficultyOptions = ["facile","moyen","hard","extreme"]
    const [isRoomOwner, setIsRoomOwner] = useState(false);
    const [roomOwner, setRoomOwner] = useState(-1);
    const auth = useAuthState();
    const params = useParams();
    const navigate =  useNavigate();
    const socket = useSocket();
    

    const startGame = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL+'/rooms/update', {room_id: params.id, config: roomInfo, participants})
            .then(() => {
                socket.emit('start-game', {room_id: params.id, room_info: roomInfo});
            })
            .catch(err => console.error(err))
    }

    const updateConfig = (conf) => {
        setRoomInfo((old) => {return {...old, ...conf}});
        socket.emit('edit-config', {room_id: params.id, room_info: {...roomInfo, ...conf}});
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/rooms/'+params.id)
            .then((res) => {
                console.log(res);
                setParticipants(res.data.users);
                setIsRoomOwner(res.data.room_info.room_owner===auth.user.id)
                setRoomOwner(res.data.room_info.room_owner)

                socket.emit('join-room', {room_id: params.id, user: auth.user});

                socket.on('update-users', (msg) => {
                    setParticipants(msg.users)
                    setRoomInfo((old) => {return {...old, ...msg.roomInfo}})
                })

                if (!isRoomOwner) {
                    socket.on('update-config',(msgRoomInfo) =>{
                        setRoomInfo((old) => {return {...old, ...msgRoomInfo}})
                    })
                }

                socket.on('game-started',() => {
                    navigate(`/game/${params.id}`, { replace: true })
                })

            }).catch((e)=>{
                navigate('/');
            })

        return () => {
            socket.emit('leave-room', {room_id: params.id, user_id: auth.user.id})
            socket.off('update-users');
            socket.off('game-started');
            socket.off('update-config');
        }
    }, [])

    return (
        <div className='lobby-container'>
            <div className='lobby-left-side'>
                <FloatingCard>
                    <h1>Paramètres</h1>
                    <form>
                        <label htmlFor="participant">Nombre de participants (3-20):</label>
                        <InputField type={"number"} placeholder="Nombre de participant" id="participant" min="3" max="20" backgroundcolor="#fff" textcolor="#000" value={roomInfo.room_size} onChange={(e) => updateConfig({room_size: parseInt(e.target.value)})} disabled={!isRoomOwner}/>
                        <label htmlFor="nbrVideo">Nombre de vidéo (3-10):</label>
                        <InputField type={"number"} placeholder="Nombre de vidéo" id="nbrVideo" min="3" max="10" backgroundcolor="#fff" textcolor="#000" value={roomInfo.nb_video} onChange={(e) => updateConfig({nb_video: parseInt(e.target.value)})} disabled={!isRoomOwner}/>
                        <label htmlFor="difficulty">Difficulté :</label>
                        <Select id="difficulty" options={difficultyOptions.map((value) => ({text : Capitalize(value), value }))} value={roomInfo.difficulty} backgroundcolor={"#fff"} textcolor={"#000"} onChange={(e) => updateConfig({difficulty: e.target.value})} disabled={!isRoomOwner}/>
                        <label htmlFor="nbrLoop">Nombre de passage de la vidéo (1-5):</label>
                        <InputField type={"number"} placeholder="Nombre de passage de la vidéo " id="nbrLoop" min="1" max="5" backgroundcolor="#fff" textcolor="#000" value={roomInfo.nb_loop} onChange={(e) => updateConfig({nb_loop: parseInt(e.target.value)})} disabled={!isRoomOwner}/>

                        <Button onClick={startGame} disabled={!isRoomOwner}>Lancer le jeu</Button>
                    </form>
                </FloatingCard>
            </div>
            <div className='lobby-right-side'>
                <SidePanel position={"right"}>
                    <div className='lobby-player-list'>
                        {participants.map(p => (
                            <NamedAvatar username={p.username} src="images/player.jpg" size={100} key={p.id} owner={p.id===roomOwner}/>
                        ))}
                    </div>
                </SidePanel>
            </div>
        </div>
    )
}
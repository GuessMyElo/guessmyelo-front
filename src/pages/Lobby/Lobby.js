import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";

import './Lobby.scss';
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import Button from '@/shared/components/Button/Button';
import SidePanel from 'modules/Gameplay/shared/components/SidePanel/SidePanel';
import Select from 'shared/components/Select/Select';
import { Capitalize } from 'Utils';
import InputField from 'shared/components/InputField/InputField';
import NamedAvatar from 'modules/Player/Avatar/molecules/NamedAvatar/NamedAvatar';
import { useAuthState } from "context/Auth";
import axios from 'axios';
import {io} from 'socket.io-client';


export default function Lobby(){

    const [difficulty, setDifficulty] = useState("");
    const [roomSize, setRoomSize] = useState("3");
    const [nbrVideo, setNbrVideo] = useState("5");
    const [nbrLoop, setNbrLoop] = useState("2");
    const [roomInfo, setRoomInfo] = useState({});
    const [participants, setParticipants] = useState([]);
    const difficultyOptions = ["facile","moyen","hard","extreme"]
    
    const auth = useAuthState();
    const params = useParams();
    const socket = useRef();
    const location = useLocation();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/rooms/'+params.id)
            .then((res) => {
                setParticipants(res.data.users);
                setRoomInfo(res.data.room_info)

                socket.current = io(process.env.REACT_APP_API_URL);
                socket.current.on('connect', () => {
                    console.log(`connected`)
                })
                socket.current.emit('join-room', {room_id: params.id, user: auth.user});

                socket.current.on('update-users', (msg) => {
                    setParticipants(msg)
                })
            })
        return () => {
            socket.current.emit('leave-room', {room_id: params.id, user_id: auth.user.id})
        }
    }, [])

    return (
        <div className='lobby-container'>
            <div className='lobby-left-side'>
                <FloatingCard>
                    <h1>Paramètre</h1>
                    <form>
                        <label htmlFor="participant">Nombre de participants (3-20):</label>
                        <InputField type={"number"} placeholder="Nombre de participant" id="participant" min="3" max="20" backgroundcolor="#fff" textcolor="#000" value={roomSize} onChange={(e) => setRoomSize(e.target.value)}/>
                        <label htmlFor="nbrVideo">Nombre de participants (3-10):</label>
                        <InputField type={"number"} placeholder="Nombre de vidéo" id="nbrVideo" min="3" max="10" backgroundcolor="#fff" textcolor="#000" value={nbrVideo} onChange={(e) => setNbrVideo(e.target.value)}/>
                        <label htmlFor="difficulty">Difficulté :</label>
                        <Select id="difficulty" options={difficultyOptions.map((value) => ({text : Capitalize(value), value }))} value={difficulty} onChange={(e) => setDifficulty(e.target.value)} backgroundcolor={"#fff"} textcolor={"#000"} />
                        <label htmlFor="nbrLoop">Nombre de passage de la vidéo (1-5):</label>
                        <InputField type={"number"} placeholder="Nombre de passage de la vidéo " id="nbrLoop" min="1" max="5" backgroundcolor="#fff" textcolor="#000" value={nbrLoop} onChange={(e) => setNbrLoop(e.target.value)}/>

                        <Link to="/game">
                            <Button>Lancer le jeu</Button>
                        </Link>
                    </form>
                </FloatingCard>
            </div>
            <div className='lobby-right-side'>
                <SidePanel position={"right"}>
                    <div className='lobby-player-list'>
                        {participants.map(p => (
                            <NamedAvatar username={p.username} src="images/player.jpg" size={100} key={p.id}/>
                        ))}
                    </div>
                </SidePanel>
            </div>
        </div>
    )
}
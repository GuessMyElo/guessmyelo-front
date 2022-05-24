import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Lobby.scss';
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import Button from '@/shared/components/Button/Button';
import SidePanel from 'modules/Gameplay/shared/components/SidePanel/SidePanel';
import Select from 'shared/components/Select/Select';
import { Capitalize } from 'Utils';
import InputField from 'shared/components/InputField/InputField';
import NamedAvatar from 'modules/Player/Avatar/molecules/NamedAvatar/NamedAvatar';
import { useAuthState } from "context/Auth";


export default function Lobby(){

    const [difficulty, setDifficulty] = useState("");
    const [participant, setParticipant] = useState("3");
    const [nbrVideo, setNbrVideo] = useState("5");
    const [nbrLoop, setNbrLoop] = useState("2");
    const difficultyOptions = ["facile","moyen","hard","extreme"]
    
    const auth = useAuthState();

    return (
        <div className='lobby-container'>
            <div className='lobby-left-side'>
                <FloatingCard>
                    <h1>Paramètre</h1>
                    <form>
                        <label for="participant">Nombre de participants (3-20):</label>
                        <InputField type={"number"} placeholder="Nombre de participant" id="participant" min="3" max="20" backgroundcolor="#fff" textcolor="#000" value={participant} onChange={(e) => setParticipant(e.target.value)}/>
                        <label for="nbrVideo">Nombre de participants (3-10):</label>
                        <InputField type={"number"} placeholder="Nombre de vidéo" id="nbrVideo" min="3" max="10" backgroundcolor="#fff" textcolor="#000" value={nbrVideo} onChange={(e) => setNbrVideo(e.target.value)}/>
                        <label for="difficulty">Difficulté :</label>
                        <Select id="difficulty" options={difficultyOptions.map((value) => ({text : Capitalize(value), value }))} value={difficulty} onChange={(e) => setDifficulty(e.target.value)} backgroundcolor={"#fff"} textcolor={"#000"} />
                        <label for="nbrLoop">Nombre de passage de la vidéo (1-5):</label>
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
                        <NamedAvatar username={auth.user ? auth.user.username : "Pseudo"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={ "Pseudo"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"Pseudo"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"dsjfhdkjfsndsqdhjdgqdqsddfjsdf"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"Pseudo"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"Pseudo"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"lucaslebogossedu59"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"Pseudo"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"aaa"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"jesappellegroot"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"z"} src="images/player.jpg" size={100}/>
                        <NamedAvatar username={"Pseudo"} src="images/player.jpg" size={100}/>
                    </div>
                </SidePanel>
            </div>
        </div>
    )
}
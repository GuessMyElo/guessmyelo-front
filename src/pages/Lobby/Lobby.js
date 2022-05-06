import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Lobby.scss';
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import Picture from '@/modules/Player/Avatar/atoms/Picture/Picture';
import Button from '@/shared/components/Button/Button';
import SidePanel from 'modules/Gameplay/shared/components/SidePanel/SidePanel';
import Select from 'shared/components/Select/Select';
import { Capitalize } from 'Utils';
import InputField from 'shared/components/InputField/InputField';


export default function Lobby(){

    const [difficulty, setDifficulty] = useState("");
    const difficultyOptions = ["facile","moyen","hard","extreme"]

    return (
        <div className='lobby-container'>
            <div className='lobby-left-side'>
                <FloatingCard>
                    <h1>Paramètre</h1>
                    <form>
                        
                        <InputField type={"number"} placeholder="Code de la partie" />
                        <Select options={difficultyOptions.map((value) => ({text : Capitalize(value), value }))} value={difficulty} onChange={(e) => setDifficulty(e.target.value)} backgroundcolor={"#fff"} textcolor={"#000"} />
                        <Link to="/game">
                            <Button>Lancer le jeu</Button>
                        </Link>
                    </form>
                </FloatingCard>
            </div>
            <div className='lobby-right-side'>
                <SidePanel position={"right"}>
                    <div className='lobby-player-list'>
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                        <Picture src="images/player.jpg" size="100" />
                    </div>
                </SidePanel>
            </div>
        </div>
    )
}
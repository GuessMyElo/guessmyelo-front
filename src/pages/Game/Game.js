import React from 'react';
import './Game.scss';
import VotingSection from '../../modules/Gameplay/molecules/VotingSection';
import SidePanel from '../../modules/Gameplay/shared/components/SidePanel/SidePanel';
import Picture from 'modules/Player/Avatar/atoms/Picture/Picture';
import GameAvatar from 'modules/Player/Avatar/molecules/GameAvatar';

export default function Game(){
    return (
        <div className='game-container'>
            <SidePanel>
                <div className='game-player-list left'>
                    <GameAvatar src="images/player.jpg" size="80" status={"done"} />
                    <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                    <GameAvatar src="images/player.jpg" size="80" status={""} />                    
                    <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                    <GameAvatar src="images/player.jpg" size="80" status={undefined} />
                    <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                    <GameAvatar src="images/player.jpg" size="80" status={undefined} />
                    <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                    <GameAvatar src="images/player.jpg" size="80" status={"done"} />
                </div>
            </SidePanel>
            <VotingSection/>
        </div>
    )
}
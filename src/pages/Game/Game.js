import React from 'react';
import './Game.scss';
import VotingSection from '../../modules/Gameplay/molecules/VotingSection/VotingSection';
import SidePanel from '../../modules/Gameplay/shared/components/SidePanel/SidePanel';
import GameAvatar from 'modules/Player/Avatar/molecules/GameAvatar';
import VideoSection from 'modules/Gameplay/atoms/VideoSection/VideoSection';
import NumberRoundSection from 'modules/Gameplay/atoms/NumberRoundSection/NumberRoundSection';

export default function Game(){
    return (
        <div className='game-container'>
            <div className='game-left-section'>
                <SidePanel position={"left"}>
                    <div className='game-player-list'>
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
            </div>
            <div className='game-right-section'>
                <NumberRoundSection>
                    7/10
                </NumberRoundSection>
                <VideoSection/>
                <VotingSection/>
            </div>
        </div>
    )
}
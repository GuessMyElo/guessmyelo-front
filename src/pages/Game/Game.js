import React from 'react';
import './Game.scss';
import VotingSection from '../../modules/Gameplay/molecules/VotingSection';
import SidePanel from '../../modules/Gameplay/shared/components/SidePanel/SidePanel';

export default function Game(){
    return (
        <div className='game-container'>
            <SidePanel>
                <ul>
                    <li>test 1</li>
                    <li>test 2</li>
                    <li>test 3</li>
                </ul>
            </SidePanel>
            <VotingSection/>
        </div>
    )
}
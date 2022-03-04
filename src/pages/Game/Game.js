import React from 'react';
import './Game.scss';
import VotingSection from '../../modules/Gameplay/molecules/VotingSection';

export default function Game(){
    return (
        <div className='game-container'>
            <VotingSection/>
        </div>
    )
}
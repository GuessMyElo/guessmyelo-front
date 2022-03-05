import React from 'react';
import { Link } from 'react-router-dom';
import './Scoreboard.scss';
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import ScoreboardItem from '@/modules/Informations/ScoreboardItem/molecules/ScoreboardItem';
import Button from '@/shared/components/Button/Button';

export default function Scoreboard(){
    return (
        <div className='scoreboard-container'>
            <FloatingCard>
                <h1>Classement</h1>
                <div className='scoreboard-list'>
                    {new Array(10).fill(0).map((elem, index) => (
                        <ScoreboardItem key={index} player={"Hoozu"} score={35} isEven={index % 2 === 0} />
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
import React from 'react';
import './Homepage.scss';
import FloatingCard from '../../shared/components/FloatingCard/FloatingCard';

export default function Homepage(){
    return (
        <div className='homepage-container'>
            <FloatingCard>
                <h1>Jouer</h1>
            </FloatingCard>
        </div>
    )
}
import React from 'react';
import './Homepage.scss';
import FloatingCard from '../../shared/components/FloatingCard/FloatingCard';
import Picture from '../../modules/Player/Avatar/atoms/Picture/Picture';

export default function Homepage(){
    return (
        <div className='homepage-container'>
            <FloatingCard>
                <h1>Jouer</h1>
                <div className='avatar-container'>
                    <Picture src="images/player.jpg" size="130" />
                    <div className='avatar-select'>
                        <button>Importer une photo</button>
                        <div className='default-avatar'>
                            <Picture src="images/player.jpg" size="50" />
                            <Picture src="images/player.jpg" size="50" />
                            <Picture src="images/player.jpg" size="50" />
                        </div>
                    </div>
                </div>
            </FloatingCard>
        </div>
    )
}
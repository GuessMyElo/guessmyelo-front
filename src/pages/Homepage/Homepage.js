import React from 'react';
import { Link } from "react-router-dom";

import './Homepage.scss';
import FloatingCard from '@/shared/components/FloatingCard/FloatingCard';
import Picture from '@/modules/Player/Avatar/atoms/Picture/Picture';
import Button from '@/shared/components/Button/Button';
import InputField from '@/shared/components/InputField/InputField';

export default function Homepage(){
    return (
        <div className='homepage-container'>
            <FloatingCard>
                <h1>Jouer</h1>
                <div className='avatar-container'>
                    <Picture src="images/player.jpg" size="130" />
                    <div className='avatar-select'>
                        <Button>Importer une photo</Button>
                        <div className='default-avatar'>
                            <Picture src="images/player.jpg" size="50" />
                            <Picture src="images/player.jpg" size="50" />
                            <Picture src="images/player.jpg" size="50" />
                        </div>
                    </div>
                </div>
                <form>
                    <InputField placeholder="Pseudo" />
                    <div className='form-row'>
                        <InputField placeholder="Code de la partie" />
                        <Button>Rejoindre la partie</Button>
                    </div>
                    <Link to="/game">
                        <Button>Créer une partie</Button>
                    </Link>
                    <Link to="/upload">
                        <Button reversed>Uploader une video</Button>
                    </Link>
                </form>
            </FloatingCard>
        </div>
    )
}
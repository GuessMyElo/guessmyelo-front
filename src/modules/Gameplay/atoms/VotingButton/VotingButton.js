import React from 'react';
import './VotingButton.scss';

export default function VotingButton({src, id, alt}){
    return (
        <button title={id.toUpperCase()} id={id} className='votingbutton-container' onClick={() =>{
            console.log(id);
        }}>
            <img src={src} alt={alt}/>
        </button>
    )
}
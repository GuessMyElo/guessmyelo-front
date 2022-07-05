import React from 'react';
import './VotingButton.scss';

export default function VotingButton({src, id, alt, handleVotingResponse}){
    return (
        <button title={id.toUpperCase()} id={id} className='votingbutton-container' onClick={() =>{
            console.log(id);
            handleVotingResponse(id)
        }}>
            <img src={src} alt={alt}/>
        </button>
    )
}
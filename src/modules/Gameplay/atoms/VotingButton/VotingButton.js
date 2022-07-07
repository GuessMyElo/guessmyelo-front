import React from 'react';
import './VotingButton.scss';

export default function VotingButton({src, id, alt,handleVotingResponse,selected}){
    return (
        <button title={id.toUpperCase()} id={id} className={`votingbutton-container ${selected ? "active" : ""}`} onClick={(e) =>{
            handleVotingResponse(id)
        }}>
            <img src={src} alt={alt}/>
        </button>
    )
}
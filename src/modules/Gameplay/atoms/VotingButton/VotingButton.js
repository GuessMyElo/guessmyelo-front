import React from 'react';
import './VotingButton.scss';

export default function VotingButton({src, id, alt}){
    return (
<<<<<<< HEAD
        <button title={id.toUpperCase()} id={id} className='votingbutton-container' onClick={() =>{
=======
        <button id={id} className='votingbutton-container' onClick={() =>{
>>>>>>> 2c16183fe97297c8d8b19a211ccc6847a04dfb2b
            console.log(id);
        }}>
            <img src={src} alt={alt}/>
        </button>
    )
}
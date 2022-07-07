import './VotingSection.scss';
import '../../atoms/VotingButton/VotingButton.js';
import VotingButton from '../../atoms/VotingButton/VotingButton.js';

export default function VotingSection({handleVotingResponse,answer}) {
    return (
        <div className="votingsection-container">
            <VotingButton selected={answer==='iron'} handleVotingResponse={handleVotingResponse} id='iron' src="/images/rank_Iron.png" alt="Image du rang Iron ou Fer"/>
            <VotingButton selected={answer==='bronze'} handleVotingResponse={handleVotingResponse} id='bronze' src="/images/rank_Bronze.png" alt="Image du rang Bronze"/>
            <VotingButton selected={answer==='silver'} handleVotingResponse={handleVotingResponse} id='silver' src="/images/rank_Silver.png" alt="Image du rang Silver ou Argent"/>
            <VotingButton selected={answer==='gold'} handleVotingResponse={handleVotingResponse} id='gold' src="/images/rank_Gold.png" alt="Image du rang Gold ou Or"/>
            <VotingButton selected={answer==='platinum'} handleVotingResponse={handleVotingResponse} id='platinum' src="/images/rank_Platinum.png" alt="Image du rang Platinium ou Platine"/>
            <VotingButton selected={answer==='diamond'} handleVotingResponse={handleVotingResponse} id='diamond' src="/images/rank_Diamond.png" alt="Image du rang Diamond ou Diamant"/>
            <VotingButton selected={answer==='master'} handleVotingResponse={handleVotingResponse} id='master' src="/images/rank_Master.png" alt="Image du rang Master"/>
            <VotingButton selected={answer==='grandmaster'} handleVotingResponse={handleVotingResponse} id='grandmaster' src="/images/rank_Grandmaster.png" alt="Image du rang Grandmaster"/>   
            <VotingButton selected={answer==='challenger'} handleVotingResponse={handleVotingResponse} id='challenger' src="/images/rank_Challenger.png" alt="Image du rang Challenger"/> 
        </div>
    )
}
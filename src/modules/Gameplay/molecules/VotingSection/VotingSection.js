import './VotingSection.scss';
import '../../atoms/VotingButton/VotingButton.js';
import VotingButton from '../../atoms/VotingButton/VotingButton.js';

export default function VotingSection({handleVotingResponse}) {
    return (
        <div className="votingsection-container">
            <VotingButton handleVotingResponse={handleVotingResponse} id='iron' src="/images/rank_Iron.png" alt="Image du rang Iron ou Fer"/>
            <VotingButton handleVotingResponse={handleVotingResponse} id='bronze' src="/images/rank_Bronze.png" alt="Image du rang Bronze"/>
            <VotingButton handleVotingResponse={handleVotingResponse} id='silver' src="/images/rank_Silver.png" alt="Image du rang Silver ou Argent"/>
            <VotingButton handleVotingResponse={handleVotingResponse} id='gold' src="/images/rank_Gold.png" alt="Image du rang Gold ou Or"/>
            <VotingButton handleVotingResponse={handleVotingResponse} id='platinum' src="/images/rank_Platinum.png" alt="Image du rang Platinium ou Platine"/>
            <VotingButton handleVotingResponse={handleVotingResponse} id='diamond' src="/images/rank_Diamond.png" alt="Image du rang Diamond ou Diamant"/>
            <VotingButton handleVotingResponse={handleVotingResponse} id='master' src="/images/rank_Master.png" alt="Image du rang Master"/>
            <VotingButton handleVotingResponse={handleVotingResponse} id='grandmaster' src="/images/rank_Grandmaster.png" alt="Image du rang Grandmaster"/>   
            <VotingButton handleVotingResponse={handleVotingResponse} id='challenger' src="/images/rank_Challenger.png" alt="Image du rang Challenger"/> 
        </div>
    )
}
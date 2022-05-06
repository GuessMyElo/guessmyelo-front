import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import VotingSection from '../../modules/Gameplay/molecules/VotingSection/VotingSection';
import SidePanel from '../../modules/Gameplay/shared/components/SidePanel/SidePanel';
import GameAvatar from 'modules/Player/Avatar/molecules/GameAvatar';
import VideoSection from 'modules/Gameplay/atoms/VideoSection/VideoSection';
import NumberRoundSection from 'modules/Gameplay/atoms/NumberRoundSection/NumberRoundSection';
import ProgressBar from 'shared/components/ProgressBar/ProgressBar';


export default function Game() {

    const videoRef = useRef();
    const [videoCurrentProgress, setVideoCurrentProgress] = useState(0);
    const [videoLoopOnce, setVideoLoopOnce] = useState(false);

    useEffect(() => {
        videoRef.current.addEventListener("timeupdate", () => setVideoCurrentProgress((videoRef.current.currentTime / videoRef.current.duration) * 100));
        videoRef.current.addEventListener("ended", () => {
            if (!videoLoopOnce) {
                console.log(videoLoopOnce);
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setVideoLoopOnce(true);
                console.log(videoLoopOnce);
            }
        })
    }, [videoLoopOnce])

    return (
        <div className='game-container'>
            <div className='game-left-section'>
                <SidePanel position={"left"}>
                    <div className='game-player-list'>
                        <GameAvatar src="images/player.jpg" size="80" status={"done"} />
                        <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="images/player.jpg" size="80" status={""} />
                        <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="images/player.jpg" size="80" status={undefined} />
                        <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="images/player.jpg" size="80" status={undefined} />
                        <GameAvatar src="images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="images/player.jpg" size="80" status={"done"} />
                    </div>
                </SidePanel>
            </div>
            <div className='game-right-section'>
                <NumberRoundSection>
                    <p>7/10</p>
                </NumberRoundSection>
<<<<<<< HEAD
                <VideoSection source={'/videos/video01.mp4'} videoRef ={videoRef} />
                <VotingSection />
                <ProgressBar value={videoCurrentProgress} />
=======
                <VideoSection/>
                <VotingSection/>
                <ProgressBar/>
>>>>>>> 75d9e1e (Front page Game)
            </div>
        </div>
    )
}
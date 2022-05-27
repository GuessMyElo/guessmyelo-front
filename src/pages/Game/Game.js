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
    const [videoLoop, setVideoLoop] = useState(2);
    const [textVideo, setTextVideo] = useState('Votez !');
    const [textVideoBool, setTextVideoBool] = useState(false);
    const interval = useRef();

    useEffect(() => {
        videoRef.current.addEventListener("timeupdate", () => setVideoCurrentProgress((videoRef.current.currentTime / videoRef.current.duration) * 100));
        videoRef.current.addEventListener("ended", () => {
            if (videoLoop>1) {
                console.log(videoLoop);
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setVideoLoop((old)=>old-1);
            }
            else{
                videoRef.current.pause(); 
                setTextVideoBool(true);
                setTimeout(() => {
                    setTextVideo(3);
                    interval.current= setInterval(() => {
                        setTextVideo((old)=>old-1)
                        
                    }, 1000);
                }, 5000);

                
            }
        })
    }, [videoLoop])

    useEffect(() => {
        return ()=> {
            if (textVideo<=1) {
                    return clearInterval(interval.current);
            }
        }
    }, [textVideo])


    return (
        <div className='game-container'>
            <div className='game-left-section'>
                <SidePanel position={"left"}>
                    <div className='game-player-list'>
                        <GameAvatar src="/images/player.jpg" size="80" status={"done"} />
                        <GameAvatar src="/images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="/images/player.jpg" size="80" status={""} />
                        <GameAvatar src="/images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="/images/player.jpg" size="80" status={undefined} />
                        <GameAvatar src="/images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="/images/player.jpg" size="80" status={undefined} />
                        <GameAvatar src="/images/player.jpg" size="80" status={"waiting"} />
                        <GameAvatar src="/images/player.jpg" size="80" status={"done"} />
                    </div>
                </SidePanel>
            </div>
            <div className='game-right-section'>
                <NumberRoundSection>
                    <p>7/10 ({videoLoop})</p>
                </NumberRoundSection>
                <div className='main-section'>
                    {textVideoBool && (
                    <div><p>{textVideo}</p></div>
                    )}
                    <VideoSection source={'/videos/video01.mp4'} videoRef ={videoRef} />
                </div>
                <VotingSection />
                <ProgressBar value={videoCurrentProgress} />
            </div>
        </div>
    )
}
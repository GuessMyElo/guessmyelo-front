import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import VotingSection from '../../modules/Gameplay/molecules/VotingSection/VotingSection';
import SidePanel from '../../modules/Gameplay/shared/components/SidePanel/SidePanel';
import GameAvatar from 'modules/Player/Avatar/molecules/GameAvatar';
import VideoSection from 'modules/Gameplay/atoms/VideoSection/VideoSection';
import NumberRoundSection from 'modules/Gameplay/atoms/NumberRoundSection/NumberRoundSection';
import ProgressBar from 'shared/components/ProgressBar/ProgressBar';
import { useSocket } from 'context/Socket/socket';
import axios from 'axiosConfig';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'context/Auth';


export default function Game() {

    const videoRef = useRef();
    const [videoCurrentProgress, setVideoCurrentProgress] = useState(0);
    const [videoLoop, setVideoLoop] = useState(2);
    const [textVideo, setTextVideo] = useState('Votez !');
    const [textVideoBool, setTextVideoBool] = useState(false);
    const interval = useRef();
    const socket = useSocket();
    const params = useParams();
    const [roomInfo, setRoomInfo] = useState({
        room_size: 3,
        nb_video : 5,
        nb_loop: 2,
        difficulty:'facile'
    });
    const [participants, setParticipants] = useState([]);
    const [isRoomOwner, setIsRoomOwner] = useState(false);
    const [roomOwner, setRoomOwner] = useState(-1);
    const auth = useAuthState();

    useEffect(() => {
        videoRef.current.addEventListener("timeupdate", () => setVideoCurrentProgress((videoRef.current.currentTime / videoRef.current.duration) * 100));
        videoRef.current.addEventListener("ended", () => {
            if (videoLoop>1) {
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


    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/rooms/'+params.id)
            .then((res) => {
                setParticipants(res.data.room_info.participants)
                setRoomInfo(res.data.room_info.config)
                setRoomOwner(res.data.room_info.room_owner)
                setIsRoomOwner(res.data.room_info.room_owner===auth.user.id);
            })
    }, [])

    return (
        <div className='game-container'>
            <div className='turn'>
                Please turn your screen to continue
            </div>
            <div className='game-left-section'>
                <SidePanel position={"left"}>
                    <div className='game-player-list'>
                        {participants.map((u) => (
                            <GameAvatar src="/images/player.jpg" size="80" status={"waiting"} key={u.id} />
                        ))}
                    </div>
                </SidePanel>
            </div>
            <div className='game-right-section'>
                <NumberRoundSection>
                    <p>0/{roomInfo.nb_video} ({roomInfo.nb_loop})</p>
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
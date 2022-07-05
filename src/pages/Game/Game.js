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
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'context/Auth';


export default function Game() {
    const [loading, setLoading] = useState(true);
    const videoRef = useRef();
    const [tourProgress, setTourProgress] = useState(0);
    const [textVideo, setTextVideo] = useState('Votez !');
    const [textVideoBool, setTextVideoBool] = useState(false);
    const [gameState, setGameState] = useState(null);
    const interval = useRef();
    const socket = useSocket();
    const navigate = useNavigate();
    const params = useParams();
    const [roomInfo, setRoomInfo] = useState({
        room_size: 3,
        nb_video : 5,
        nb_loop: 2,
        difficulty:'facile'
    });
    const [videoLoop, setVideoLoop] = useState(1);
    const [participants, setParticipants] = useState([]);
    const auth = useAuthState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/rooms/'+params.id)
            .then((res) => {
                setParticipants(res.data.room_info.participants)
                setRoomInfo(res.data.room_info.config)
                socket.emit('join-room', {room_id: params.id, user: auth.user});

                socket.emit('request-game', params.id);
                setLoading(false);
            })
            .catch(() => navigate('/'))
            
            socket.on('game-data', (data) => {
                setGameState(data.state);
            })

        return () => {
            socket.emit('leave-room', {room_id: params.id, user_id: auth.user.id})
        }
    }, [])

    useEffect(() => {
        if (videoRef.current && !loading && gameState) {
            const currentTime = (new Date().getTime() - gameState.timestamp) / 1000;
            videoRef.current.currentTime = currentTime;
            videoRef.current.addEventListener("timeupdate", handleTourProgress);
            videoRef.current.addEventListener("ended", handleVideoLoop)

            socket.on('loop-started', (data) => {
                setGameState(data);
                console.log("loop", data)
                const currentTime = (new Date().getTime() - data.timestamp) / 1000;
                console.log(currentTime);
                videoRef.current.currentTime = currentTime;
                videoRef.current.play();
                setVideoLoop(videoLoop + 1);
            })
        
            return () => {
                socket.off('game-data');
                videoRef.current.removeEventListener('timeupdate', handleTourProgress);
                videoRef.current.removeEventListener("ended", handleVideoLoop);
            }
        }
    }, [videoLoop, loading, videoRef.current, gameState])

    useEffect(() => {
        return ()=> {
            if (textVideo<=1) {
                return clearInterval(interval.current);
            }
        }
    }, [textVideo])

    const handleTourProgress = (e) => {
        const currentTime = (new Date().getTime() - gameState.timestamp) / 1000;
        const timecode = (videoRef.current.duration * (videoLoop - 1)) + currentTime;
        const totalDuration = roomInfo.nb_loop * videoRef.current.duration;
        setTourProgress((timecode / totalDuration) * 100)
    }

    const handleVideoLoop = () => {
        const currentLoop = videoLoop;
        console.log(currentLoop, roomInfo.nb_loop)
        if (currentLoop < roomInfo.nb_loop) {
            socket.emit('new-loop', params.id);
        } else {
            videoRef.current.pause(); 
            setTextVideoBool(true);
            setTimeout(() => {
                setTextVideo(3);
                interval.current= setInterval(() => {
                    setTextVideo((old)=>old-1)
                }, 1000);
            }, 5000);
        }
    }

    const handleVotingResponse = (votingResponse) => {
        console.log(params.id,auth.user.id,votingResponse);
        socket.emit('save-answer',{room_id:params.id,user_id:auth.user.id,answer:votingResponse});
    }

    if (loading) {
        return <p>loading...</p>
    }

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
                    <p>0/{roomInfo.nb_video} ({videoLoop}/{roomInfo.nb_loop})</p>
                </NumberRoundSection>
                <div className='main-section'>
                    {textVideoBool && (
                    <div><p>{textVideo}</p></div>
                    )}
                    <VideoSection source={'/videos/video01.mp4'} videoRef ={videoRef} />
                </div>
                <VotingSection handleVotingResponse={handleVotingResponse}/>
                <ProgressBar value={tourProgress} />
            </div>
        </div>
    )
}
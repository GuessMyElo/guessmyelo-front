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
        nb_video : 2,
        nb_loop: 2,
        difficulty:'facile'
    });
    const [currentVideo, setCurrentVideo] = useState(null);
    const [participants, setParticipants] = useState([]);
    const auth = useAuthState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/rooms/'+params.id)
            .then((res) => {
                setParticipants(res.data.users)
                setRoomInfo(JSON.parse(res.data.room_info.config))
                socket.emit('join-room', {room_id: params.id, user: auth.user});

                socket.emit('request-game', params.id);
                setLoading(false);
            })
            .catch(() => navigate('/'))
            
            socket.on('game-data', ({state}) => {
                if(state.videos && state.videos[state.current_video]) {
                    setCurrentVideo(state.videos[state.current_video].url);
                    setGameState(state);
                }

                else {
                    socket.emit('handle-user-answer', params.id)
                    navigate(`/scoreboard/${params.id}`, { replace: true })
                }
            })

        return () => {
            // socket.emit('leave-room', {room_id: params.id, user_id: auth.user.id})
            socket.off('game-data');
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
                const currentTime = (new Date().getTime() - data.timestamp) / 1000;
                videoRef.current.currentTime = currentTime;
                videoRef.current.play();
            })

            socket.on('answer-saved', (data) => {
                setParticipants(data.users);
                
            })

            socket.on('user-state-reseted', (data) => {
                setParticipants(data.users);
                
            })

            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('timeupdate', handleTourProgress);
                    videoRef.current.removeEventListener("ended", handleVideoLoop);
                }
                socket.off('answer-saved');
                socket.off('loop-started');
                socket.off('user-state-reseted')
            }
        }
    }, [loading, videoRef.current, gameState])

    useEffect(() => {
        if (textVideo===0) {
            clearInterval(interval.current);
            setTextVideoBool(false);
            setTextVideo("Votez !");
            socket.emit("reset-user-state", params.id);
            socket.emit("next-video", params.id);
        }

        return ()=> {
            socket.off("reset-user-state");
            socket.off("next-video");
        }
    }, [textVideo])

    const handleTourProgress = (e) => {
        const currentTime = (new Date().getTime() - gameState.timestamp) / 1000;
        const timecode = (videoRef.current.duration * (gameState.loop - 1)) + currentTime;
        const totalDuration = roomInfo.nb_loop * videoRef.current.duration;
        setTourProgress((timecode / totalDuration) * 100)
    }


    const handleVideoLoop = () => {
        const currentLoop = gameState.loop;
        if (currentLoop < roomInfo.nb_loop) {
            socket.emit('new-loop', params.id);
        } else {
            videoRef.current.pause();
            setTextVideoBool(true);
            setTimeout(() => {
                setTextVideo(3);
                interval.current = setInterval(() => { 
                    setTextVideo((old)=>old-1)
                }, 1000);
            }, 10);
        }
    }

    const handleVotingResponse = (votingResponse) => {
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
                            <GameAvatar src="/images/player.jpg" size="80" status={ u.answered ? "done":"waiting"} key={u.id} />
                        ))}
                    </div>
                </SidePanel>
            </div>
            <div className='game-right-section'>
                <NumberRoundSection>
                    {gameState!=null && <p>{gameState.current_video+1}/{roomInfo.nb_video} ({gameState.loop}/{roomInfo.nb_loop})</p>}
                </NumberRoundSection>
                <div className='main-section'>
                    {textVideoBool && (
                    <div><p>{textVideo}</p></div>
                    )}
                    {currentVideo && <VideoSection source={currentVideo} videoRef ={videoRef} autoPlay/>}
                </div>
                <VotingSection handleVotingResponse={handleVotingResponse}/>
                <ProgressBar value={tourProgress} />
            </div>
        </div>
    )
}
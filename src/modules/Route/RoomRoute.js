import { useRoomState } from "context/Room/RoomContext";
import { socket } from "context/Socket/socket";
import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function RoomRoute() {
    // const [{step},dispatch] = useRoomState();
    // const location = useLocation();
    // const page = location.pathname.split("/")[1];
    // const room_id = location.pathname.split("/")[2];

    // useEffect(() => {
    //     socket.on('update-users', ({state}) => {
    //         if(step !== state.step) {
    //             dispatch({type : "UPDATE_STEP", step : state.step !== undefined ? state.step : "lobby"})
    //         }
    //         console.log(step);
    //     })

    //     return () => {
    //         socket.off('update-users');
    //     }
    // }, [step]);

    // if(step === "lobby" && page!== "lobby") return <Navigate to={`/lobby/${room_id}`} />
    // if(step === "game" && page!=="game") return <Navigate to={`/game/${room_id}`} />
    // if(step === "scoreboard" && page!=="scoreboard") return <Navigate to={`/scoreboard/${room_id}`} />

    return <Outlet />
}
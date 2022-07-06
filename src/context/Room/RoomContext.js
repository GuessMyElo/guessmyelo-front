import React, { useReducer } from "react";
import { RoomReducer, initialState } from "./RoomReducer";

const RoomStateContext = React.createContext();

export const useRoomState = () => React.useContext(RoomStateContext);

export const RoomProvider = ({ children }) => {
  return (
    <RoomStateContext.Provider value={useReducer(RoomReducer, initialState)}>
      {children}
    </RoomStateContext.Provider>
  );
};
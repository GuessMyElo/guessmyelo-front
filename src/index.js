import React from "react";
import ReactDOM from "react-dom";
import "./global.scss";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "./context/Auth";
import reportWebVitals from "./reportWebVitals";
import { SocketContext, socket } from "context/Socket/socket";
import { RoomProvider } from "context/Room/RoomContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <RoomProvider>
        <SocketContext.Provider value={socket}>
          <App />
        </SocketContext.Provider>
      </RoomProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

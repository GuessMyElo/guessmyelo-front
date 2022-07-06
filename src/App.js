import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRedirect from "./pages/AuthRedirect/AuthRedirect";
import Homepage from "./pages/Homepage/Homepage";
import Game from "./pages/Game/Game";
import Upload from "./pages/Upload/Upload";
import Login from "./pages/Login/Login";
import Scoreboard from "pages/Scoreboard/Scoreboard";
import Register from "pages/Register/Register";
import Lobby from "pages/Lobby/Lobby";
import AuthRoute from "modules/Route/AuthRoute";
import UnAuthRoute from "modules/Route/UnAuthRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "pages/Verify/Verify";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute redirect="/login" />}>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path='/upload' element={<Upload/>} />
            <Route exact path='/scoreboard/:id' element={<Scoreboard/>} />
            <Route exact path='/lobby/:id' element={<Lobby/>} />
            <Route exact path='/game/:id' element={<Game/>} />
            <Route exact path="/verify" element={<Verify />} />
          </Route>
          <Route element={<UnAuthRoute redirect="/" />}>
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/register' element={<Register/>} />
            <Route exact path='/auth/:type' element={<AuthRedirect/>} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          theme="colored"
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          draggable
        />
      </BrowserRouter>
  );
}

export default App;

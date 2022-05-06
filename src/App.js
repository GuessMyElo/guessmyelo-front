import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthRedirect from './pages/AuthRedirect/AuthRedirect';
import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';
import Upload from './pages/Upload/Upload';
import Login from './pages/Login/Login';
import Scoreboard from 'pages/Scoreboard/Scoreboard';
import Register from 'pages/Register/Register';

import AuthRoute from 'modules/Route/AuthRoute';
import UnAuthRoute from 'modules/Route/UnAuthRoute';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute redirect="/login" />}>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path='/upload' element={<Upload/>} />
            <Route exact path='/scoreboard' element={<Scoreboard/>} />
          </Route>
          <Route element={<UnAuthRoute redirect="/" />}>
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/register' element={<Register/>} />
            <Route exact path='/auth/:type' element={<AuthRedirect/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

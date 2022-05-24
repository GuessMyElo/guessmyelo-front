import Scoreboard from 'pages/Scoreboard/Scoreboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';
import Upload from './pages/Upload/Upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route exact path='/game' element={<Game/>} />
        <Route exact path='/upload' element={<Upload/>} />
        <Route exact path='/scoreboard' element={<Scoreboard/>} />
      </Routes>
      <ToastContainer 
        position='top-center'
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

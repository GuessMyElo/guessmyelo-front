import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Game from './pages/Game/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route exact path='/game' element={<Game/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

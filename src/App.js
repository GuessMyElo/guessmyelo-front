import Scoreboard from 'pages/Scoreboard/Scoreboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import Upload from './pages/Upload/Upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route exact path='/upload' element={<Upload/>} />
        <Route exact path='/scoreboard' element={<Scoreboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

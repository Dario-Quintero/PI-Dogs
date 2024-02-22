import { Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome/Welcome.jsx' 

function App() {
  return (
    <div >
    <Routes>
      <Route path='/' element={<Welcome />}/>   
      {/* <Route path='/home' element={<Home />}/>
      <Route path='/detail' element={<Detail />}/>       */}
    </Routes>
    </div>
  );
}

export default App;

import { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import Welcome from './components/Welcome/Welcome.jsx' 
import Home from './components/Home/Home.jsx'
import './App.css';

function App() {
  const [dogs, setDogs] = useState([])

    useEffect(() => {
        const getDogs = async () => {
            const {data} = await axios('http://localhost:3001/dogspi/dogs')
            setDogs(prevDogs => [...prevDogs, ...data.map(dog => dog)])
        }
        getDogs()
    },[])

  return (
    <div >
      <Routes>
        <Route path='/' element={<Welcome dogs={dogs}/>}/>   
        <Route path='/home' element={<Home dogs={dogs}/>}/>
        {/* <Route path='/detail' element={<Detail />}/>       */}
      </Routes>
    </div>
  );
}

export default App;

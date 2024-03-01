import { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import Welcome from './components/Welcome/Welcome.jsx' 
import Home from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail.jsx'
import Create from './components/Create/Create.jsx'
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

    const handleSearch = async(input) =>{
      if(dogs.some(d => d.name.toLowerCase() === input.toLowerCase())){
        return window.alert('Dog on Screen')
      }
      try {
        const {data} = await axios (`http://localhost:3001/dogspi/dogs/name?='${input}'`)
        setDogs((prevDogs)=>[...prevDogs, data])
      } catch (error) {
        window.alert('Error, Dog not found')
      }
    }
  return (
    <div >
      <Routes>
        <Route path='/' element={<Welcome dogs={dogs}/>}/>   
        <Route path='/home' element={<Home dogs={dogs} handleSearch={handleSearch}/>}/>
        <Route path='/detail/:id' element={<Detail />}/> 
        <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;

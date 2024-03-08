import axios from 'axios';
import { useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reqDogs, reqTemps} from './redux/action.js'
import Welcome from './components/Welcome/Welcome.jsx' 
import Home from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail.jsx'
import Create from './components/Create/Create.jsx'
import Search from './components/Search/Search.jsx';
import './App.css';

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dogs = useSelector(state => state.dogs)
  const error = useSelector(state => state.error)
  const temps = useSelector(state => state.temps)
  
  const getDogs = () =>{
    dispatch(reqDogs())
  }
  const handleError = () =>{
    if(error){
      window.alert(error)
    }
  }
  useEffect(()=>{
    handleError(error)
  },[error])

  useEffect(() => {
    getDogs()
    dispatch(reqTemps())
  },[])

    const handleSearch = async(input) =>{
      if(!input){
         window.alert('Insert a Dog name')
      }
      if(dogs.some(d => d.name.toLowerCase() === input.toLowerCase())){
         window.alert('Dog on Screen')
      }else{
       try {
        const {data} = await axios (`http://localhost:3001/dogspi/dogs/name?name=${input}`)
        if(data.req === 'api'){
          const response = await axios(`http://localhost:3001/dogspi/dogs/${data.id}`)
          navigate(`/search`,{ state: { dog: response.data } })
        }else{
          navigate(`/search`, { state: { dog: data } })
        }
       } catch (error) {
        window.alert('Dog not found')
       }
      }
    }

  return (
    <div >
      <Routes>
        <Route path='/' element={<Welcome dogs={dogs}/>}/>   
        <Route path='/home' element={<Home dogs={dogs} temps={temps} handleSearch={handleSearch} getDogs={getDogs} />}/>
        <Route path='/detail/:id' element={<Detail />}/> 
        <Route path='/search' element={<Search />}/>
        <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;

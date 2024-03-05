import { useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Welcome from './components/Welcome/Welcome.jsx' 
import Home from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail.jsx'
import Create from './components/Create/Create.jsx'
import './App.css';
import { reqDogs, reqDog, reqTemps} from './redux/action.js'

function App() {
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
        dispatch(reqDog(input))
      }
    }

  return (
    <div >
      <Routes>
        <Route path='/' element={<Welcome dogs={dogs}/>}/>   
        <Route path='/home' element={<Home dogs={dogs} temps={temps} handleSearch={handleSearch} getDogs={getDogs} />}/>
        <Route path='/detail/:id' element={<Detail />}/> 
        <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;

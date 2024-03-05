import Cards from '../Cards/Cards.jsx'
import spacedog from '../../img/spacedog.png'
import s from './Home.module.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { filteredDogs, orderDogs } from '../../redux/action.js'

const Home = ({dogs, temps, handleSearch, getDogs}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState('')
    const [ aux, setAux] = useState(false)

    const handleChange = (event) => {
        const {value} = event.target
        setState(value)
    }
    const handleClick = () => {
        handleSearch(state)
        setState('')
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSearch(state)
            setState('')
        }
     };
    const handleOrder = (e) =>{
        dispatch(orderDogs(e.target.value))
        setAux(!aux)

    }
    const handleFilter = (e) =>{
        dispatch(filteredDogs(e.target.value))
    }
    const navigate = useNavigate()
    const goCreate = () =>{
        navigate('/Create')
    }
        return(
            <div className={s.page}>
                <div className={s.navbar}>
                        <img src={spacedog} alt="spacedog" />
                        <h1>Space Dogs</h1>
                    <div>
                        <button onClick={getDogs}>Get dogs</button>
                        <input type='text' value={state} placeholder="Search Dog" onChange={handleChange} onKeyDown={handleKeyDown}/>
                        <button onClick={handleClick}>Search</button>
                        <button onClick={goCreate}>Create</button>
                    </div>
                </div>
                <div className={s.filter}> 
                    <h3>Filtrar</h3>
                    <select name="Filter" onChange={handleFilter}>
                        <option value="None">None</option>
                        {temps.map(temp => <option value={temp}>{temp}</option> )}
                    </select>
                    <select name="Order" onChange={handleOrder}>
                        <option value="A">Ascendent</option>
                        <option value="D">Descendent</option>

                    </select>
                </div>
                <div className={s.cards}> 
                    <Cards dogs={dogs} itemsXPage='18'/>
                </div>
                
            </div>
        )
   
}
export default Home
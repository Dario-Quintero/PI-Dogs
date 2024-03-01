import Cards from '../Cards/Cards.jsx'
import spacedog from '../../img/spacedog.png'
import s from './Home.module.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const Home = ({dogs, handleSearch, getDogs}) => {
    const [state, setState] = useState('')
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
                    <select name="" id="">
                        <option value="Name">Name</option>
                        <option value="Breed">Breed</option>
                    </select>
                    <select name="" id="">
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
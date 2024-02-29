import Cards from '../Cards/Cards.jsx'
import spacedog from '../../img/spacedog.png'
import s from './Home.module.css'
import { useState } from "react"


const Home = ({dogs, handleSearch}) => {
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

        return(
            <div className={s.page}>
                <div className={s.navbar}>
                        <img src={spacedog} alt="spacedog" />
                        <h1>Space Dogs</h1>
                    <div>
                        <input type='text' value={state} placeholder="Search Dog" onChange={handleChange} onKeyDown={handleKeyDown}/>
                        <button onClick={handleClick}>Search</button>
                        <button >Create</button>
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
                    <Cards dogs={dogs}/>
                </div>
                
            </div>
        )
   
}
export default Home
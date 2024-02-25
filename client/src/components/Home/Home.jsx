import Cards from '../Cards/Cards.jsx'
import s from './Home.module.css'

const Home = (props) => {
        return(
            <div className={s.page}>
                <div className={s.navbar}>
                    <div className={s.divImg}>
                        <img src="" alt="img" />
                    </div>
                    <div className={s.divNav}>
                        <input type="text" />
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
                    <Cards dogs={props.dogs}/>
                </div>
                
            </div>
        )
   
}
export default Home
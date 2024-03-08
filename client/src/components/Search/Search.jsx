import s from './Search.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import spacedog from '../../img/spacedog.png'


function Search () {
    const location = useLocation();
    const dog = location.state?.dog

    const navigate = useNavigate()
    const goHome = () =>{
        navigate('/home')
    }
  
    return dog? (
        <div className={s.page}>
            <div className={s.navbar}>
                <img src={spacedog} alt="spacedog" />
                <h1>Space Dogs</h1>
                <button onClick={goHome}>Back</button>
            </div>
            <div className={s.container}>
                <div className={s.containerImg}>
                    <img src={dog.image} alt="" />
                </div>

                {dog.name === 'Information not available' ? ( 
                    <div className={s.containerInfo}>
                        <h1 className={s.title}>Sorry, this information not available. </h1>
                    </div> ) : ( 
                    <div className={s.containerInfo}>
                        <h1 className={s.title}>{dog.name} </h1>
                        <p className={s.info}><span className={s.punto}>•</span> {dog.years}</p>
                        <p className={s.info}><span className={s.punto}>•</span> Weight: {dog.weight} - Height: {dog.height} (metric) </p>
                        <p className={s.info}><span className={s.punto}>•</span> Temperaments: {dog.temperaments} </p>
                        <p className={s.info}><span className={s.punto}>•</span> Breed for: {dog.breedFor} </p>
                    </div> )}
            </div>
        </div>
    ) : <h1>Loading...</h1>
}

export default Search
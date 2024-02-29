import s from './Detail.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import spacedog from '../../img/spacedog.png'


const Detail = () => {
    const { id } = useParams()
    const [dog, setDog] = useState()
    
    useEffect(()=>{
        axios(`http://localhost:3001/dogspi/dogs/${id}`)
        .then(
            ({data}) => {
                if(data.image){
                    setDog(data);
                } else {
                    window.alert('Dog not found')
                }
            }
        );
    },[id])

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

export default Detail
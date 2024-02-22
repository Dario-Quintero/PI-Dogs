import axios from 'axios'
import { useEffect, useState } from 'react'
import s from './Welcome.module.css'

const Welcome = () => {
    const [dogs, setDogs] = useState([])
    useEffect(() => {
        const getDogs = async () => {
            const {data} = await axios('http://localhost:3001/dogspi/dogs')
            setDogs(prevDogs => [...prevDogs, ...data.map(dog => dog.url)])
        }
        getDogs()
    },[])
        return(
            <div className={s.page}>
                <div className={s.title}>
                    <h1 >Welcome to Best Dog-PI </h1>
                    <button>Home</button>
                </div>
                <div className={s.container}>
                    {dogs.map((dog, index) => (
                    <img key={index} src={dog}  className={s.dogImage} />))}
                </div>
            </div>
        )
   
}
export default Welcome
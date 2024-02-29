import { useNavigate } from 'react-router-dom'
import s from './Welcome.module.css'

const Welcome = (props) => {
    const navigate = useNavigate()
    const goHome = () =>{
        navigate('/home')
    }
        return(
            <div className={s.page}>
                <div className={s.title}>
                    <h1 >Welcome to Space Dogs </h1>
                    <button onClick={goHome}>Home</button>
                </div>
                <div className={s.container}>
                    {props.dogs.map((dog, index) => (
                    <img key={index} src={dog.image} alt={dog+index} className={s.dogImage} />))}
                </div>
            </div>
        )
   
}
export default Welcome
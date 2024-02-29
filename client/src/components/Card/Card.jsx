import { useNavigate } from 'react-router-dom'
import s from './Card.module.css'

const Card = (props) =>{
    const navigate = useNavigate()
    const goDetail = () =>{
        navigate(`/detail/${props.dog.id}`)
    }
    return(
        <div className={s.card}>
            <div className={s.divImg}>
                <img src={props.dog.image} alt="" />
            </div>
            <div className={s.divName}>
                {props.dog.name === 'Information not available' ? (
                    <h3>{props.dog.name}</h3>
                ) : (
                    <div >
                        <h3>{props.dog.name}</h3>
                        <button onClick={goDetail}>Details</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card
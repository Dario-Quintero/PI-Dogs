import { useNavigate } from 'react-router-dom'
import s from './Card.module.css'

const Card = ({dog}) =>{
    const navigate = useNavigate()
    const goDetail = () =>{
        navigate(`/detail/${dog.id}`)
    }
    return(
        <div className={s.card}>
            <div className={s.divImg}>
                <img src={dog.image} alt="" />
            </div>
            <div className={s.divName}>
                {dog.name !== 'false'&&(
                    <div >
                        <h3>{dog.name}</h3>
                        <button onClick={goDetail}>Details</button>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Card
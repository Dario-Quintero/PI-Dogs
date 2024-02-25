import s from './Card.module.css'

const Card = (props) =>{
    return(
        <div className={s.card}>
            <div className={s.divImg}>
                <img src={props.dog.image} alt="" />
            </div>
            <div className={s.divName}>
                <h3>{props.dog.name}</h3>
                <button>Details</button>
            </div>
        </div>
    )
}

export default Card
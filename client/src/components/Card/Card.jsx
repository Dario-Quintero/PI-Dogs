import s from './Card.module.css'

const Card = (props) =>{
    return(
        <div>
            <img src={props.dog.url} alt="" />
        </div>
    )
}

export default Card
import Card from '../Card/Card.jsx'
import s from './Cards.module.css'

const Cards = (props) =>{
    return (
        <div className={s.container}>
            {props.dogs.map((d)=>(
                <Card dog={d} key={d.id} />
            ))}
        </div>
    )
}
export default Cards
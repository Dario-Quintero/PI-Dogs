import Card from '../Card/Card.jsx'
import { useState } from 'react'; 
import s from './Cards.module.css'

const Cards = ({ dogs, itemsXPage }) => {
    const [page, setPage] = useState(1);
    const pages = Math.ceil(dogs.length / itemsXPage);
  
    const handlePage = (numeroPagina) => {
      setPage(numeroPagina);
    };
  
    const itemsDisplayed= dogs.slice((page - 1) * itemsXPage, page * itemsXPage);
    return (
        <div>
            <div className={s.pages}>
                {[...Array(pages)].map((e, i) => (
                    <button key={i} onClick={() => handlePage(i + 1)}>
                    {i + 1} 
                    </button>
                ))}
            </div>
            <div className={s.container}>
                {itemsDisplayed.map((d)=>(
                <Card dog={d} key={d.id} />
                ))}
            </div>
            
        </div>
    )
}
export default Cards
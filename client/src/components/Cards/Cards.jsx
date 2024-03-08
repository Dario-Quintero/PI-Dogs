import Card from '../Card/Card.jsx'
import { useState, useEffect } from 'react'; 
import s from './Cards.module.css'

const Cards = ({ dogs, itemsXPage }) => {
    const [uniqueDogs, setUniqueDogs] = useState([]);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(uniqueDogs.length / itemsXPage);
    useEffect(() => {
        const uniqueDogs = Array.from(new Set(dogs.map(dog => dog.id)))
          .map(id => {
            return dogs.find(dog => dog.id === id);
          });
      
        setUniqueDogs(uniqueDogs);
      }, [dogs]);
    const handlePage = (numeroPagina) => {
      setPage(numeroPagina);
    };
    const itemsDisplayed = uniqueDogs.slice((page - 1) * itemsXPage, page * itemsXPage);
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

// import { useEffect, useState } from 'react';

// function Component() {
//   const [dogs, setDogs] = useState([]);
//   const [uniqueDogs, setUniqueDogs] = useState([]);

//   useEffect(() => {
//     // Aquí es donde obtendrías tus datos y los guardarías en el estado de "dogs"
//     // Por ejemplo: setDogs(data);
//   }, []);

//   useEffect(() => {
//     const dogsById = dogs.reduce((acc, dog) => {
//       return { ...acc, [dog.id]: dog };
//     }, {});

//     setUniqueDogs(Object.values(dogsById));
//   }, [dogs]);

//   // Ahora "uniqueDogs" contiene tus perros sin duplicados
// }

import s from './Create.module.css'
import { useState } from 'react'
import spacedog from '../../img/spacedog.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
    const navigate = useNavigate()
    const goHome = () =>{
        navigate('/home')
    }
    const [form, setForm] = useState({
        image:'',
        name:'',
        years:'',
        width:'',
        height:'',
        temperaments:''
})

    const handleChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        
        setForm({...form, [property]:value})
    }

    const handleSubmit = (event) =>{
        event.preventDefault()

        let emptyFields = [];
        for (let field in form) {
            if (!form[field]) {
            emptyFields.push(field);
            }
        }

        if (emptyFields.length > 0 ) {
            window.alert(`The following fields are empty: ${emptyFields.join(', ')}`);
        }else if( form.image.length > 255){
            window.alert('The link address cannot be that long')
        }else{
            form.temperaments.split(',')
            postForm(form)
        }
    }

    const postForm = (form) => {
        axios.post(`http://localhost:3001/dogspi/dogs/`, form)
            .then(() => {
                window.alert('successfully created dog')
            })
            .catch((error) => {
                window.alert(error.response.data.message)
            })
    }
    return (
        <div className={s.page}>
            <div className={s.container}>
                <img src={spacedog} alt="spacedog" />
                <form  onSubmit={handleSubmit} action="/create-dog" method="post">
                    <input type="url" onChange={handleChange} name="image" placeholder="Image (url)" />
                    <input type="text" onChange={handleChange} name="name" placeholder="Name" />
                    <input type="text" onChange={handleChange} name="years" placeholder="Years" />
                    <input type="number" onChange={handleChange} name="width" placeholder="Width (number)" />
                    <input type="number" onChange={handleChange} name="height" placeholder="Height (number)" />
                    <input type="text" onChange={handleChange} name="temperaments" placeholder="Temperaments" />
                    <div className={s.divButton}>
                       <button type="submit">Create</button>
                        <button onClick={goHome}>Back</button> 
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Create
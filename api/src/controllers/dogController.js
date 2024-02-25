require('dotenv').config();
const {API_KEY} = process.env 
const axios = require('axios')
const {database} = require('../db')
const Dog = database.models.dog
const infoNA = 'Information not available'
const randomDog = async (req, res) =>{
    try{
        const {data} = await axios(`https://api.thedogapi.com/v1/images/search?limit=1&api_key=${API_KEY}`)
        if(!data){
            return res.status(404).send('Dog not found')
        }
        let dog;
        if(data.breeds){
            dog = {
                id: data.id,
                name: data.breeds[0].name,
                image: data.url,
                weight: data.breeds[0].weight.metric,
                height: data.breeds[0].height.metric,
                years: data.breeds[0].life_span,
                temperaments: data.breeds[0].temperament,
                breedFor: data.breeds[0].bred_for ? data.breeds[0].bred_for : infoNA
            }
        } else {
            dog = {
                id: data[0].id,
                image: data[0].url,
                name: infoNA,
                weight: infoNA,
                height: infoNA,
                years: infoNA,
                temperaments: infoNA,
                breedFor: infoNA
            }
        }
        return res.status(200).json(dog)
    }catch(err){
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

const getDogs = async (req, res) => {
    try{
        const {data} = await axios(`https://api.thedogapi.com/v1/images/search?limit=20&api_key=${API_KEY}`)
        if(!data){
            return res.status(404).send('Dogs not found')
        }
        const dogs = data.map(dog => {
            return dog.breeds && dog.breeds.length > 0 ? {
                id: dog.id,
                name: dog.breeds[0].name,
                image: dog.url,
                weight: dog.breeds[0].weight.metric,
                height: dog.breeds[0].height.metric,
                years: dog.breeds[0].life_span,
                temperaments: dog.breeds[0].temperament,
                breedFor: dog.breeds[0].bred_for ? dog.breeds[0].bred_for : 'No information available'
            } : {
                id: dog.id,
                image: dog.url,
                name: 'No information available',
                weight: 'No information available',
                height: 'No information available',
                years: 'No information available',
                temperaments: 'No information available',
                breedFor: 'No information available'
            }
        })
        return res.status(200).json(dogs)

    }catch(err){
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

const getDogByID = async(req, res) => {
    const id = req.params.idRaza
    try{
        const {data} = await axios(`https://api.thedogapi.com/v1/images/${id}`)
        if(!data){
            return res.status(404).send('Dog not found')
        }
        let dog;
        if(data.breeds){
            dog = {
                id: data.id,
                name: data.breeds[0].name,
                image: data.url,
                weight: data.breeds[0].weight.metric,
                height: data.breeds[0].height.metric,
                years: data.breeds[0].life_span,
                temperaments: data.breeds[0].temperament,
                breedFor: data.breeds[0].bred_for ? data.breeds[0].bred_for : infoNA
            }
        } else {
            dog = {
                id: data.id,
                image: data.url,
                name: infoNA,
                weight: infoNA,
                height: infoNA,
                years: infoNA,
                temperaments: infoNA,
                breedFor: infoNA
            }
        }
        return res.status(200).json(dog)
    }catch(err){
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

const getDogByName = async (req, res) => {
    const {name} = req.query
    try {
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        let dog;
        if(data.breeds){
            dog = {
                id: data.id,
                name: data.breeds[0].name,
                image: data.url,
                weight: data.breeds[0].weight.metric,
                height: data.breeds[0].height.metric,
                years: data.breeds[0].life_span,
                temperaments: data.breeds[0].temperament,
                breedFor: data.breeds[0].bred_for ? data.breeds[0].bred_for : infoNA
            }
        } else {
            dog = {
                id: data.id,
                image: data.url,
                name: infoNA,
                weight: infoNA,
                height: infoNA,
                years: infoNA,
                temperaments: infoNA,
                breedFor: infoNA
            }
        }
        return res.status(200).json(dog)
    } catch (err) {
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

const postDog = async (req, res) => {
    const {image, name, height, weight, years} = req.body
    if(!image || !name || !height || !weight || !years){
        return res.status(400).json({message: 'Incomplete information'})
    }
    try {   
        const [newDog, created] = await Dog.findOrCreate({
            where: { name : name},
            defaults:{ image, name, height, weight, years }
        })
        if(created){
            res.status(201).json(newDog)
        }else{
            res.status(200).json({message:"This dog already exists"})
        }
    } catch (err) {
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}
module.exports= {
    randomDog,
    getDogs,
    getDogByID,
    getDogByName,
    postDog
}
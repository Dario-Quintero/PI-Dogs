require('dotenv').config();
const {API_KEY} = process.env 
const axios = require('axios')
const {database} = require('../db')
const Dog = database.models.dog
const Temperaments = database.models.temperaments
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
        const {data} = await axios(`https://api.thedogapi.com/v1/images/search?limit=18&api_key=${API_KEY}`)
        if(!data){
            return res.status(404).send('Dogs not found')
        }
        const dogs = data.map(dog => {
            return dog.breeds && dog.breeds.length > 0 ? {
                id: dog.id,
                name: dog.breeds[0].name,
                temperaments: dog.breeds[0].temperament,
                image: dog.url
            } : {
                id: dog.id,
                name: 'false',
                temperaments: false,
                image: dog.url
                
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
        const dog = {
                id: data.id,
                name: data.breeds[0].name,
                image: data.url,
                weight: data.breeds[0].weight.metric,
                height: data.breeds[0].height.metric,
                years: data.breeds[0].life_span,
                temperaments: data.breeds[0].temperament,
                breedFor: data.breeds[0].bred_for ? data.breeds[0].bred_for : infoNA
            }
        
        return res.status(200).json(dog)
    }catch(err){
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

const getDogByName = async (req, res) => {
    const {name} = req.query
    try {
        const data = await Dog.findOne({ where: {name}})
        
        if(!data){
           const {data: apiData} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
            if(!apiData || apiData.length === 0){
            return res.status(404).send('Dog not found')
            }
            let dog = {
            req: 'api',
            id:'',
            }
            apiData.forEach(item => {
            dog.id = item.reference_image_id;
            }); 
            return res.status(200).json(dog)
        }

        let dog = {
            req: 'db',
            id: data.id, 
            image: data.image, 
            name: data.name, 
            height: data.height, 
            weight: data.weight, 
            years: data.years,
            temperaments: (await data.getTemperaments()).map(temperament => temperament.name).join(', ')
        }
        return res.status(200).json(dog)
    } catch (err) {
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}



const postDog = async (req, res) => {
    const {image, name, height, weight, years, temperaments} = req.body
    if(!image || !name || !height || !weight || !years || !temperaments){
        return res.status(400).json({message: 'Incomplete information'})
    }
    try {   
        const [newDog, created] = await Dog.findOrCreate({
            where: { name : name},
            defaults:{ image, name, height, weight, years}
        })

        let temperamentsArray = temperaments.split(', ').map(temp => temp.trim());
        for(let i = 0; i<temperamentsArray.length; i++){
            const [temperament] = await Temperaments.findOrCreate({where:{name:temperamentsArray[i]}});
            await newDog.addTemperaments(temperament);
        }

        if(created){
            res.status(201).json(newDog)
        }else{
            res.status(404).json({message:"This dog already exists"})
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
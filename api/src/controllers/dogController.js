require('dotenv').config();
const {API_KEY} = process.env 
const axios = require('axios')
const {database} = require('../db')
const Dog = database.models.dog

const getDogs = async(req, res) => {
    try{
        const {data} = await axios(`https://api.thedogapi.com/v1/images/search?limit=15&api_key=${API_KEY}`)
        if(!data){
            return res.status(404).send('Dogs not found')
        }
        return res.status(200).json(data)
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
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

const getDogByName = async (req, res) => {
    const {name} = req.query
    try {
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        return res.status(200).json(data)
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
    getDogs,
    getDogByID,
    getDogByName,
    postDog
}
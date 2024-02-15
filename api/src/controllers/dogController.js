require('dotenv').config();
const axios = require('axios')
const {API_KEY} = process.env 

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
    try{
        console.log('ando')
        const id = req.params.idRaza
        const {data} = await axios(`https://api.thedogapi.com/v1/images/${id}`)
        if(!data){
            return res.status(404).send('Dog not found')
        }
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

const getDogByName = async (req, res) =>{
    try {
        const {name} = req.query
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

module.exports= {
    getDogs,
    getDogByID,
    getDogByName,

}
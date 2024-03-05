const axios = require('axios')
const {database} = require('../db')
const Temperaments = database.models.temperaments

const getTemperaments = async(req, res) => {
    try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds');
        const breeds = response.data;
    
        let temperaments = [];
        for (let breed of breeds) {
          if (breed.temperament) {
            let tempArray = breed.temperament.split(',').map(temp => temp.trim());
            temperaments = [...temperaments, ...tempArray];
          }
        }
        temperaments = [...new Set(temperaments)];
        for(let temp of temperaments){
            await Temperaments.findOrCreate({where:{name: temp}})
        }
        res.status(200).json(temperaments.sort());
    } catch (err) {
        return res.status(500).send(`Internal Error - ${err.message}`)
    }
}

module.exports = {
    getTemperaments
}
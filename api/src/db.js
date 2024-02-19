require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const DogModel = require('./models/Dog')
const TemperamentsModel = require('./models/Temperaments')

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {logging: false, native: false});

DogModel(database)
TemperamentsModel(database)

const Dog = database.models.dog;
const Temperaments = database.models.temperaments

Dog.belongsToMany(Temperaments, {through: "dog_temperaments"})
Temperaments.belongsToMany(Dog, {through: "dog_temperaments"})


module.exports = {
  database
};

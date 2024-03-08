import axios from "axios"

export const ADD_DOGS = 'ADD_DOGS'
export const ORDER = 'ORDER'
export const FILTER = 'FILTER'
export const ERROR = 'ERROR'
export const TEMPERAMENTS = 'TEMPERAMENTS'

export const addDogs = (dogs) =>{
    return{
        type: ADD_DOGS,
        payload: dogs
    }
}
export const addTemps = (temps) =>{
    return{
        type: TEMPERAMENTS,
        payload: temps
    }
}
export const errorHandler = (error) =>{
    return {
        type: ERROR,
        payload: error.response.data
    }
}
export const filteredDogs = (temp) =>{
    return{ 
        type: FILTER,
        payload: temp
    }
}
export const orderDogs = (order) => {
    return{
        type: ORDER,
        payload: order
    }
}

// reqs
export const reqDogs = () => {
    return async dispatch =>{
        try {
            const {data} = await axios('http://localhost:3001/dogspi/dogs')
        dispatch(addDogs(data))
        } catch (error) {
            dispatch(errorHandler(error))
            }
        }
    }

export const reqTemps = () => {
    return async dispatch => {
        try {
            const {data} = await axios(`http://localhost:3001/dogspi/temperaments`)
            dispatch(addTemps(data))
        } catch (error) {
            dispatch(errorHandler(error))
        }
    }
}
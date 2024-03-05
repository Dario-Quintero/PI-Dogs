import { ADD_DOGS, FILTER, ORDER, ERROR, TEMPERAMENTS } from "./action";

const initialState = {
    dogs:[],
    copyDogs:[],
    temps: [],
    error:""
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_DOGS:
            return {
                ...state, dogs:[...state.dogs, ...action.payload], copyDogs:[...state.copyDogs, ...action.payload]
            };
        case TEMPERAMENTS:
            return{
                ...state, temps: action.payload
            }
        case FILTER:
            if(action.payload === 'None'){
                return {
                    ...state, dogs: state.copyDogs
                }
            }
            const dogFiltered = state.copyDogs.filter((dog)=>{
                return dog.temperaments && dog.temperaments.includes(action.payload)
            })
            return{
                ...state, dogs: dogFiltered
            }
        case ORDER:
            let ordered = [...state.dogs].sort((a, b)=>{
                if (a.name === 'false') return 1;
                if (b.name === 'false') return -1;
                return action.payload === "A" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)})
            return{
                ...state, dogs: ordered
            }
        case ERROR:
            return{
                ...state, error: action.payload
            }
        default:
            return{
                ...state
            }
    }
}
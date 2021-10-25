import {
    GET_DOGS,
    SEARCH_BY_NAME,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    SORT_BY_NAME,
    SORT_BY_WEIGHT,
    GET_DETAIL
} from '../actions';

const initialState = {
    dogs : [],
    allDogs: [],
    temperaments: [],
    detail: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){

        case GET_DOGS:

            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                dogs: action.payload,
            }
        case GET_TEMPERAMENTS:

            return{
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:

            const allDogs = state.allDogs;
            const temperamentsFiltered = action.payload === 'all' ? allDogs : allDogs.filter(e => {
                if(typeof(e.temperament) === 'string') return e.temperament.includes(action.payload);
                if(Array.isArray(e.temperament)){
                    let temps = e.temperament.map(e => e.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return{
                ...state,
                dogs: temperamentsFiltered
            }

        case FILTER_BY_ORIGIN:

            const all = state.allDogs;
            const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(e => e.createdInDb) : all.filter(e => !e.createdInDb);
            return{
                ...state,
                dogs: originFiltered
            }

        case SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ?
            state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortedName
            }
        case SORT_BY_WEIGHT:
            const sortedWeight = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.weightMin) - parseInt(b.weightMin);
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.weightMax) - parseInt(a.weightMax);
                });
            return {
                ...state,
                dogs: sortedWeight,
            }

        case 'POST_DOG':
            return{
                ...state
            }

        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }

}

export default rootReducer;
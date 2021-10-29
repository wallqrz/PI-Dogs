import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
export const GET_DETAIL = 'GET_DETAIL';
export const SEARCH_FAIL = 'SEARCH_FAIL';


export function getDogs(name){
    return async function(dispatch){
           try {
               if(name){
                   return await axios.get(`http://localhost:3001/dogs?name=${name}`)
                   .then(res => dispatch({ type: GET_DOGS, payload: res.data}))
                   .catch(err => dispatch({ type: GET_DOGS, payload: err.data}))
               }
               let json = await axios.get('http://localhost:3001/dogs', {})
               return dispatch({
                   type: GET_DOGS,
                   payload: json.data
               });

           }  catch(err){
            var fail = await axios.get('http://localhost:3001/dogs?name=' + name)
                .then(res => res.data)
            return dispatch({
                type: SEARCH_FAIL,
                payload: fail,
            });
        }
    }
}

  export function searchByName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            if(json.length === 0){
            }
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            alert('Dog not found');
        }
    }
}

export function getTemperaments(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/temperament', {})
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        })
    }
}

export function filterDogsByTemperament(payload){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}


export function filterDogsByOrigin(payload){
    return{
        type: FILTER_BY_ORIGIN,
        payload,
    }
}

export function sortByName(payload){
    return{
        type: SORT_BY_NAME,
        payload,
    }
}

export function sortByWeight(payload){
    return{
        type: SORT_BY_WEIGHT,
        payload,
    }
}

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/dogs', payload)
        console.log(response)
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
            
        } catch (err) {
            alert('Detail not found')
            
        }
    }
}
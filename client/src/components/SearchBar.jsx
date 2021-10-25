import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from '../actions';
import { searchByName } from "../actions";
import '../styles/SearchBar.css';


export default function SearchBar(){

    const dispatch = useDispatch();
    const [ name, setName ] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault();
        var found = searchByName(name);
        dispatch(found);
        setName('');
    }
    

    return(
        <div>
            <input 
            type="text"
            placeholder='Search by name...'
            onChange={e => handleInputChange(e)}
            value={name}
            className='input'
            onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button
            type='submit'
            onClick={e => handleSubmit(e)}
            className='fetch'
            >
                <strong>Search!</strong>
            </button>
        </div>
    )
}
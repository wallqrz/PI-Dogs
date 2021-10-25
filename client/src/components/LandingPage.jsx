import React from "react";
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import { GiDogHouse } from 'react-icons/gi';

export default function landingPage(){
    return(
        <div className='divLP'>
            <img src="https://previews.123rf.com/images/vasya/vasya1408/vasya140800057/31024394-huellas-de-animales-fondo-sin-patr%C3%B3n.jpg" alt="Doggies" width="100%" height="100%" />
            <Link to = '/home'>
                <button className='button'> <h1><span> Home <GiDogHouse/></span></h1> </button>
            </Link>
        </div>
    )

}
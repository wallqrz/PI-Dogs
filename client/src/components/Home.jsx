import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterDogsByTemperament, filterDogsByOrigin, sortByName, sortByWeight } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginado from  './Paginado';
import SearchBar from './SearchBar';
import '../styles/Home.css';
import { GiDogHouse,GiSittingDog, GiDogBowl } from 'react-icons/gi';


export default function Home (){
     
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);


    // Paginado
    const [ currentPage, setCurrentPage ] = useState(1);
    const [dogsPerPage, /*setDogsPerAge*/] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);


    const[/*orden*/, setOrden] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getDogs());
    },[dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterTemperaments(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByTemperament(e.target.value))
    }

    function handleFilterByOrigin(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByOrigin(e.target.value))
    }

    function handleSortByName(e){
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortByWeight(e){
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return(
        <div className='Home'>
            <div className='divNB'>
                <ul className='navBar'>
                    <li>
                        <button onClick={e=> {handleClick(e) }} className='elementNB'>
                            Home <GiDogHouse/>
                        </button>
                    </li>
                    <li>
                        <Link to='/newDog'>
                            <button className='elementNB'>
                                Create Dog <GiSittingDog/>
                            </button>
                        </Link>
                    </li>
                    <li className='contentSelect'>
                        <select onChange={e => handleSortByName(e)}>
                            <option value="selected" hidden className='elementNB'>Sort by name</option>
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                        </select>
                    </li>
                    <li className='contentSelect'>
                        <select onChange={e => handleSortByWeight(e)}>
                            <option value="selected">Sort by weight</option>
                            <option value="asc">Light to heavy</option>
                            <option value="desc">Heavy to light</option>
                        </select>
                    </li>
                    <li className='contentSelect'>
                        <select onChange={e => handleFilterTemperaments(e)}>
                            <option key={0} value="all">All temperaments</option>
                            {allTemperaments?.sort(function(a, b){
                                if(a.name < b.name) return -1;
                                if(a.name > b.name) return 1;
                                return 0;
                            }).map(el => {
                                return(
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className='contentSelect'>
                        <select onChange={e => handleFilterByOrigin(e)}>
                            <option value="all">All dogs</option>
                            <option value="api">Our dogs</option>
                            <option value="created">Uploaded</option>
                        </select>
                    </li>
                    <li>
                        <SearchBar/>
                    </li>

                </ul>

            </div>

            <h1><GiDogBowl/> Doggos APP <GiDogBowl/></h1>

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/>

            <div className='container'>
                {
                    currentDogs?.map((e) => {
                        return(
                                    <div key={e.id} className='cardHome'>
                            <Link to={`/dogs/${e.id}`} style={{ textDecoration: 'none'}}>
                                    <Card
                                        name = {e.name}
                                        image = {e.image}
                                        temperament = {e.temperament}
                                        weightMin={e.weightMin}
                                        weightMax={e.weightMax}
                                        key = {e.id}
                                        />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/>
            <Link to='/'><button className='welcome'><span>Welcome Page</span></button></Link>
        </div>
    )
}
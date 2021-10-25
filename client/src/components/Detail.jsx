import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import '../styles/Detail.css'
import { GiDogBowl, GiDogHouse, GiSittingDog } from 'react-icons/gi';

export default function Detail(props){
    const dispatch = useDispatch();

    let id = props.match.params.id;

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const myDog = useSelector((state) => state.detail);



    return(
        <div className='divDetail'>
            <div className='detailNB'>
            <Link to='/home'><button className='buttonHome1' id='home'>Home <GiDogHouse/> </button></Link>
            <Link to='/newDog'>
                <button className='buttonHome1'>
                    Create Dog <GiSittingDog/>
                </button>
            </Link>
            </div>
            {
                myDog.length > 0 ?
                <div className='principalDiv'>
                    <h1 className='name'>{myDog[0].name}</h1>
                    <ul className='asd'>
                        <li>
                            <div>
                                <img src={myDog[0].image} alt={myDog[0].image} className='image'/>
                            </div>
                        </li>
                        <li>
                            <div className='containerDetail'>
                                <h4 className='caracts'>Temperaments:</h4>
                                <ul className='allTemps'>
                                    {
                                    // myDog[0].createdInDb?
                                    //         myDog[0].Temperaments.map(el => {
                                    //             return <li key={el}><label>{el}</label></li>
                                    //         }) :
                                    myDog[0].temperament ?
                                        myDog[0].temperament.split(', ').map(el => {
                                            return <li key={el}><label>{el}</label></li>
                                        }) : 'We have not reserchs about this new dog, sorry'}
                                </ul>
                                <h4 className='caracts'>Height</h4>
                                    <p>{myDog[0].heightMin} - {myDog[0].heightMax} cm</p>
                                    <h4 className='caracts'>Weight</h4>
                                    <p>{myDog[0].weightMin} - {myDog[0].weightMax} kg</p>
                                    <h4 className='caracts'>Life span</h4>
                                    <p className='last'>{myDog[0].life_span} years</p>
                            </div>
                        </li>
                    </ul>
                </div> :
                <div className='loading'>
                    <h1><strong>Loading doggo <GiDogBowl/></strong></h1>
                </div>
            }
            <br />
            <br />
            <br />
        </div>
    )
}
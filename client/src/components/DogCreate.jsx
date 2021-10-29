import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { getTemperaments, postDog } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/DogCreate.css';
import { GiDogHouse } from 'react-icons/gi';
import { IoPaw } from 'react-icons/io5';


export function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'There must have a name';
    }
    else if (input.name.length > 30) {
        errors.name = 'That name is too long';
    }
    else if (!input.heightMin) {
        errors.heightMin = 'Minimum height is required';
    }
    else if (isNaN(parseInt(input.heightMin))) {
        errors.heightMin = 'It should be a number';
    }
    else if (input.heightMin <= 0) {
        errors.heightMin = 'It can´t be less than 0';
    }
    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
        errors.heightMin = 'The minimum height must be lower than maximum';
    }
    else if (!input.heightMax) {
        errors.heightMax = 'Maximum height is required';
    }
    else if (isNaN(parseInt(input.heightMax))) {
        errors.heightMax = 'It should be a number';
    }
    else if (input.heightMax > 150) {
        errors.heightMax = 'Dogs can not reach that height';
    }
    else if (!input.weightMin) {
        errors.weightMin = 'Minimum weight is required';
    }
    else if (isNaN(parseInt(input.weightMin))) {
        errors.weightMin = 'It should be a number';
    }
    else if (input.weightMin <= 0) {
        errors.weightMin = 'Your dog must be heavier than 0';
    }
    else if (!input.weightMax) {
        errors.weightMax = 'Maximum weight is required';
    }
    else if (isNaN(parseInt(input.weightMax))) {
        errors.weightMax = 'It should be a number';
    }
    else if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
        errors.weightMax = 'The maximum should be higher than minimum';
    }
    else if (input.weightMax > 200) {
        errors.weightMax = 'Dogs can not be that heavy';
    }
    else if (!input.life_span) {
        errors.life_span = 'Life span is required';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'It should be a number';
    }
    else if (input.life_span > 50) {
        errors.life_span = 'Dogs can not live that long';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'It must be alive unless for a while';
    }

    return errors;

}

export default function DogCreate(){

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:'',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan:'',
        image:'',
        temperaments:[]
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        
        console.log(input);
    }

    function handleSelect(e){
        if(!input.temperaments.includes(e.target.value)){
            setInput({
                ...input,
                temperaments:[...input.temperaments, e.target.value]
            });
            console.log(input);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(errors);
        if(Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.lifeSpan && input.temperaments.length ){
            dispatch(postDog(input));
            alert('Dog created succesfully');
            setInput({
                name:'',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                lifeSpan:'',
                image:'',
                temperament:[]
            });
            history.push('/home');
        }else{
            alert('FAIL. There was a problem during your dog creation')
        }
    }

    function handleDeleteTemperament(e){
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== e)
        })
    }

    return(
        <div className='divCreate'>
            <br />
            <Link to='/home'><button className='buttonHome'>Home<GiDogHouse/></button></Link>
            <h1 className='title'>Create your own dog</h1>
            <form className='mainForm' onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong>Name:</strong></label>
                    <input type="text" value={input.name} name='name' onChange={e => handleChange(e)}/>
                    {errors.name && (<p className='error'><strong>{errors.name}</strong></p>)}
                </div>
                <div>
                    <label><strong>Minimum height: </strong></label>
                    <input type='text' value={input.heightMin} name='heightMin' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMin && (
                        <p className='error'><strong>{errors.heightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Maximum height: </strong></label>
                    <input type='text' value={input.heightMax} name='heightMax' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMax && (
                        <p className='error'><strong>{errors.heightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Minimum weight: </strong></label>
                    <input type='text' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMin && (
                        <p className='error'><strong>{errors.weightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Maximum weight: </strong></label>
                    <input type='text' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMax && (
                        <p className='error'><strong>{errors.weightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Life Span: </strong></label>
                    <input type="text" value={input.lifeSpan} name='lifeSpan' onChange={e => handleChange(e)}/>
                    <label><strong> years</strong></label>
                    {errors.lifeSpan && (<p className='error'><strong>{errors.lifeSpan}</strong></p>)}
                </div>
                <div>
                    <label><strong>Image: </strong></label>
                    <input type="text" value={input.image} name='image' onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <select onChange={e => handleSelect(e)}>
                        <option value="selected" hidden>Temperaments</option>
                        {allTemperaments?.sort(function(a, b){
                            if(a.name < b.name) return -1;
                            if(b.name < a.name) return 1;
                            return 0;
                        }).map(temp => {
                            return(
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>

                    {input.temperaments.map(e => {
                        return(

                            <ul className='allTemps' key={e}>
                                <li>
                                    <p className='temp'><strong>{e}</strong></p>
                                    <button onClick={() => handleDeleteTemperament(e)} className='x'>X</button>
                                </li>
                            </ul>
                        )
                    })}
                </div>
                <button type='submit' className='boop'><strong>Finish <IoPaw/></strong></button>
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}
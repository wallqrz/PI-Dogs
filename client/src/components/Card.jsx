import React from "react";

export default function Card({name, image, temperament, weightMin, weightMax}){
    return(
        <div className='card'>
            <h1 className='info'>{name}</h1>
            <h3 className='info'>{function(temperament){
                if(typeof (temperament) === 'string'){
                    return temperament;
                }
                if(Array.isArray(temperament)){
                    let temps = temperament.map(e => e.name);
                    return temps.join(', ');
                }
                else{
                    return 'We checking the information you provide us, thanks'
                }
            }(temperament)}
            </h3>
            <img src={image} alt={`${name}`} width='250px' height='200px' className='imageDog'/>
            {
                name !== 'Sorry we don´t have the dog you are searching' ?
                <h3 className='info'>Weight: {weightMin} - {weightMax} kg</h3> :
                <></>
            }
        </div>
    )
}
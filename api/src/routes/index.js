const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { API_KEY } = process.env;
const { Race, Temperament } = require('../db');
require('dotenv').config();
const { getAllInfo } = require('../controllers/getAllInfo');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async(req, res, next) => {
        try{
        const name= req.query.name;
        const allDogs = await getAllInfo();
        if(name){
                let dogsByName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
                dogsByName.length ?
                res.status(200).send(dogsByName) :
                res.status(404).send('Sorry we don´t have de dog name you are looking for.')
                
        } else {
                res.status(200).send(allDogs)
        }
        }
        catch(err){
        
           console.log(err)
           res.status(404).send('Dog not found')

        }
})

router.get('/dogs/:id', async (req, res, next) =>{
        const id = req.params.id;
        const allDogs = await getAllInfo();
        try {
                if(id){
                        let dogsById = await allDogs.filter(e => e.id == id);
                        dogsById.length ? 
                        res.status(200).json(dogsById) : 
                        res.status(404).send('Sorry we don´t find the ID you are looking for.')
                        
                }
                
        } catch (error) {
                res.status(404).send('Id without match.')
                
        }
})

router.get('/temperament', async (req, res, next) => {
        const dogsAll = await getAllInfo();
        try {
                const dogsTemps = dogsAll.map( e => e.temperament ).join().split(',')
                const dogsTempsTrim = dogsTemps.map( e => e.trim())
                
                dogsTempsTrim.forEach( e => {
                    if(e) {
                        Temperament.findOrCreate({
                            where: {
                                name: e
                            }
                        })
                    }
                })
        
                const allTemperaments = await Temperament.findAll();
        
                return res.status( 200 ).send( allTemperaments )
                
        } catch (error) {
                res.status(404).send('Temperament not found')
        }     
});

router.post('/dogs', async (req, res, next) => {
	const { name,
                heightMin,
                heightMax,
                weightMin,
                weightMax,
                lifeSpan,
                image,
                temperament
        } = req.body;
        
        try {
                let newRace = await Race.create({
                        name: name,
                        heightMin: heightMin,
                        heightMax: heightMax,
                        weightMin: weightMin,
                        weightMax: weightMax,
                        lifeSpan: lifeSpan,
                        image: image,
                });
        
                let temperamentDB = await Temperament.findAll({
                        where: {
                            name: temperament,
                        }
                });
                
                await newRace.addTemperament(temperamentDB);
                
                res.status(200).send('Dog created successfully!')

        } catch (error) {
                res.status(500).send('There was a problem during your dog creation.')
                
        }
        
});


module.exports = router;

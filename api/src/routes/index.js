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
        if(id){
                let dogsById = await allDogs.filter(e => e.id == id);
                dogsById.length ? 
                res.status(200).send(dogsById) : 
                res.status(404).send('Sorry we don´t find the ID you are looking for.')
                
        }
})

router.get('/temperament', async (req, res, next) => {
        let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let tempsRepeated = infoApi.data.map(e => e.temperament).toString();
        tempsRepeated = await tempsRepeated.split(',');
        const tempsConEspacio = await tempsRepeated.map(e => {
                if (e[0] == ' ') {
                return e.split('');
                }
                return e;
        });
        const tempsSinEspacio = await tempsConEspacio.map(e => {
                if (Array.isArray(e)) {
                e.shift();
                return e.join('');
                }
                return e;
        })


        await tempsSinEspacio.forEach(e => {
                if (e != '') {
                Temperament.findOrCreate({
                        where: { name: e },
                });
                }
        });
        const allTemps = await Temperament.findAll();
        res.status(200).send(allTemps);
});

router.post('/dogs', async (req, res) => {
	const { name,
                heightMin,
                heightMax,
                weightMin,
                weightMax,
                lifeSpan,
                image,
                temperament
        } = req.body;

        
        let newRace = await Race.create({
                name: name,
                heightMin,
                heightMax,
                weightMin,
                weightMax,
                lifeSpan: lifeSpan + ' years.',
                image: image,
        });

        let temperamentDB = await Temperament.findAll({
                where: {
                    name: temperament,
                }
            });
        
        newRace.addTemperament(temperamentDB);
        res.status(200).send('Dog created successfully!')
        
});


module.exports = router;

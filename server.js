const express = require('express')
const app = express()


app.use(express.json())
const API = 'ApiCar/V1'
// notre BD
const car = [
    {
        id : 1,
        marque : "mazda",
        couleur : "rouge",
        année : 1981,
        prix : "2300FC"
    },
    {
        id : 2,
        marque : "TOYOTA",
        couleur : "grise",
        année : 1956,
        prix : "6447FC"
    }
]

// retourner toutes les données de la BD
app.get('/API', (req, res) => {
    res.status(200).json(car)
    console.log(car)
})

// recuperation d'une seule donnee
app.get('/API/:id', (req, res) =>{
    const { id } = req.params
    const one = car.find(el => el.id == +id)
    if (!one) return res.sendStatus(404).json({message : "non trouvé"})
    res.status(200).json(one)
})

// ENREGISTER UN VEHICYULE
app.post('/API', (req, res) => {
    // on recupere le body de la requete
    const { body } = req
    // on recupere le contenu du body
    const newPost = {
        id : car.length + 1,
        marque :req.body.marque,
        couleur : req.body.couleur,
        année : req.body.année,
        prix : req.body.prix
    }
    car.push(newPost)
    res.status(201).json(newPost)
    if (!newPost) return res.sendStatus(500).json({msg : "erreur de sauvegarde"})
    
})

// MODIFIER UN ELEMENT SPECIPIQUE
app.put('/API/:id', (req, res) => {
    const { id } = req.params
    const { body } = req.body
    const one = car.find(el => el.id == +id )

    const newPost = {
        marque :req.body.marque,
        couleur : req.body.couleur,
        année : req.body.année,
        prix : req.body.prix
    }
    car.push(newPost)
    
  res.status(200).json(one)
})

app.delete('/API/:id', (req, res) => {
    const { id } = req.params
    const one = car.find(el => el.id === +id)
    car.splice(car.indexOf(+id), 1)
    res.status(200).json({msg : "supprime"})
})

app.listen(8082, ()=>{
    console.log('Server running ')
})
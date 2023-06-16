import mongoose from "mongoose";
import express  from'express'
const app = express()
const port = 3000
import User from "./models/User.js";
import Dish from "./models/Dish.js";


//Ruta base
app.get('/', (req, res) => {
    res.send('API del restaurante')
  });

// Obtener usuarios
app.get('/clients', async function(req, res) {

    const users = await User.find().populate('dishes');

  res.send(users);
});

// Obtener libros
app.get('/dishes', async function(req, res) {
  
      const dishes = await Dish.find().populate('clients');
  
    res.send(dishes);
});

mongoose.connect('mongodb+srv://marcos:MubS6q5cx02LmTLL@cluster0.7ynbwt5.mongodb.net/Prueba?retryWrites=true&w=majority').then(()=>{
    app.listen(port, () => {
        console.log(`App port ${port}`)
      })
});
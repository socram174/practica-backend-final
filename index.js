import mongoose from "mongoose";
import express  from'express'
const app = express()
const port = 3000
import User from "./models/User.js";
import Book from "./models/Book.js";


// Obtener usuarios
app.get('/users', async function(req, res) {

    const users = await User.find().populate('reserves');

  res.send(users);
});

// Obtener libros
app.get('/books', async function(req, res) {
  
      const books = await Book.find().populate('people');
  
    res.send(books);
});

mongoose.connect('mongodb+srv://marcos:MubS6q5cx02LmTLL@cluster0.7ynbwt5.mongodb.net/Prueba?retryWrites=true&w=majority').then(()=>{
    app.listen(port, () => {
        console.log(`App port ${port}`)
      })
});
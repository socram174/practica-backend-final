
import mongoose from "mongoose";
import express  from'express'
const app = express()
const port = 3000
const { Schema } = mongoose;

const Book = mongoose.model('Book', { code: String,book: String,description: String, people:[{ type: Schema.Types.ObjectId, ref: 'User' }]});
const User = mongoose.model('User', { name: String,faculty: String,date_last_reserve: Date,cant_reserves_last_mont: Number,reserves: [{ type: Schema.Types.ObjectId, ref: 'Book' }] });


// Obtener usuarios
app.get('/', async function(req, res) {

    const users = await User.find();



  res.send(users);
});

mongoose.connect('mongodb+srv://marcos:MubS6q5cx02LmTLL@cluster0.7ynbwt5.mongodb.net/Prueba?retryWrites=true&w=majority').then(()=>{
    app.listen(port, () => {
        console.log(`App port ${port}`)
      })
});


const libro1 = new Book({code:"COD-1",book:"super libro 1",description:"descripcion del libro 1"})
const libro2 = new Book({code:"COD-2",book:"super libro 2",description:"descripcion del libro 2"})
const libro3 = new Book({code:"COD-3",book:"super libro 3",description:"descripcion del libro 3"})
const libro4 = new Book({code:"COD-4",book:"super libro 4",description:"descripcion del libro 4"})
libro1.save()
libro2.save()
libro3.save()
libro4.save()





const newUser = new User({ name: 'Marcos',faculty:"UCN",date_last_reserve: new Date(),cant_reserves_last_mont: 6, reserves: [new Book({code:"5uasd",book:"super libro",description:"descripcion del libro"})] });
newUser.save().then(() => console.log('Usuario guardado'));
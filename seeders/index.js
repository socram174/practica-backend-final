import mongoose from 'mongoose';
const { Schema } = mongoose;
import User from '../models/User.js';
import Book from '../models/Book.js';
import Rental from '../models/Rental.js';


// 5 libros
const booksSeed = [
    {
        code: "COD-1",
        book: "Libro 1",
        description: "descripcion del libro 1",
        people : []
    },
    {
        code: "COD-2",
        book: "Libro 2",
        description: "descripcion del libro 2",
        people : []
    },
    {
        code: "COD-3",
        book: "Libro 3",
        description: "descripcion del libro 3",
        people : []
    },
    {
        code: "COD-4",
        book: "Libro 4",
        description: "descripcion del libro 4",
        people : []
    },
    {
        code: "COD-5",
        book: "Libro 5",
        description: "descripcion del libro 5",
        people : []
    },
    {
        code: "COD-6",
        book: "Libro 6",
        description: "descripcion del libro 6",
        people : []
    },
    {
        code: "COD-7",
        book: "Libro 7",
        description: "descripcion del libro 7",
        people : []
    },
    {
        code: "COD-8",
        book: "Libro 8",
        description: "descripcion del libro 8",
        people : []
    },
    {
        code: "COD-9",
        book: "Libro 9",
        description: "descripcion del libro 9",
        people : []
    },
    {
        code: "COD-10",
        book: "Libro 10",
        description: "descripcion del libro 10",
        people : []
    }
];

const usersSeed = [
    {
        name: "Marcos Silva",
        faculty: "Informatica",
        date_last_reserve: new Date(),
        cant_reserves_last_mont: 0,
        reserves: []
    },
    {
        name: "Juan Perez",
        faculty: "Geologia",
        date_last_reserve: new Date(),
        cant_reserves_last_mont: 0,
        reserves: []
    },
    {
        name: "Pedro Gonzalez",
        faculty: "Informatica",
        date_last_reserve: new Date(),
        cant_reserves_last_mont: 0,
        reserves: []
    }
];


mongoose
  .connect('mongodb+srv://marcos:MubS6q5cx02LmTLL@cluster0.7ynbwt5.mongodb.net/Prueba?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Guarda los nuevos libros y usuarios en la base de datos, sin ninguna relación entre ellos
    await Book.deleteMany({});
    const newBooks = await Book.insertMany(booksSeed);
    console.log('Books Seeded!');

    await User.deleteMany({});
    const newUsers = await User.insertMany(usersSeed);
    console.log('Users Seeded!');

    // Simulación de la relación entre libros y usuarios
    for (const user of newUsers) {
        if(user.name !== "Marcos Silva"){
            const randomBook = newBooks[Math.floor(Math.random() * newBooks.length)];
            user.reserves.push(randomBook);//Le asigna un libro aleatorio a cada usuario
            user.date_last_reserve = new Date();//Le asigna la fecha actual, y en este caso tambien signifca la fecha de la ultima vez que arrendo un libro
            await user.save();
            randomBook.people.push(user);//Luego al libro aleatorio seleccionado le guarda en el array people el usuario que arrendo el libro.
            await randomBook.save();
            await new Rental({userId: user._id, bookId: randomBook._id, date: new Date()}).save();//Guarda en la tabla Rental el usuario, el libro y la fecha en que se arrendo el libro
        }else{
            user.reserves.push(newBooks[5]);
            user.reserves.push(newBooks[3]);
            user.reserves.push(newBooks[9]);
            user.date_last_reserve = new Date();
            await user.save();
            newBooks[5].people.push(user);
            newBooks[3].people.push(user);
            newBooks[9].people.push(user);
            await newBooks[5].save();
            await newBooks[3].save();
            await newBooks[9].save();
            await new Rental({userId: user._id, bookId: newBooks[5]._id, date: new Date()}).save();
            await new Rental({userId: user._id, bookId: newBooks[3]._id, date: new Date()}).save();
            await new Rental({userId: user._id, bookId: newBooks[9]._id, date: new Date()}).save();
            
        }
        
    }

    console.log('Books and Users Seeded!');
    console.log("Calculating the number of books rented by each user in the last month");

    //Get the quiantity of books rented by each user in the last month
    for (const user of newUsers) {
        user.cant_reserves_last_mont = await Rental.countDocuments({userId: user._id, date: {$gte: new Date(new Date().setMonth(new Date().getMonth() - 1))}});//Cuenta la cantidad de libros arrendados por cada usuario en el ultimo mes
        await user.save();
    }
  })
  .then(() => {
    mongoose.connection.close();
    console.log('Database Connection Closed!');
  })
  .catch((error) => console.log(`${error} did not connect`));

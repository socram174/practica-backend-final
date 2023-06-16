import mongoose from 'mongoose';
const { Schema } = mongoose;
import User from '../models/User.js';
import Dish from '../models/Dish.js';
import Rental from '../models/Rental.js';


// 10 comidas
const dishesSeed = [
    {
        name: "Comida 1",
        price: 40,
        clients: []
    },
    {
        name: "Comida 2",
        price: 37,
        clients: []
    },
    {
        name: "Comida 3",
        price: 29,
        clients: []
    },
    {
        name: "Comida 4",
        price: 90,
        clients: []
    },
    {
        name: "Comida 5",
        price: 12,
        clients: []
    },
    {
        name: "Comida 6",
        price: 35,
        clients: []
    },
    {
        name: "Comida 7",
        price: 1,
        clients: []
    },
    {
        name: "Comida 8",
        price: 78,
        clients: []
    },
    {
        name: "Comida 9",
        price: 34,
        clients: []
    },
    {
        name: "Comida 10",
        price: 56,
        clients: []
    }
];

const usersSeed = [
    {
        name: "Marcos Silva",
        rut: "19345234-5",
        faculty: "Informatica",
        totalLastMonth: 0,
        dishes: []
    },
    {
        name: "Juan Perez",
        rut: "19345634-9",
        faculty: "Biologia",
        totalLastMonth: 0,
        dishes: []
    },
    {
        name: "Fabian Ramirez",
        rut: "19323234-5",
        faculty: "Informatica",
        totalLastMonth: 0,
        dishes: []
    }
];


mongoose
  .connect('mongodb+srv://marcos:MubS6q5cx02LmTLL@cluster0.7ynbwt5.mongodb.net/Prueba?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Guarda los nuevos usuarios y comidas en la base de datos, sin ninguna relación entre ellos
    await Dish.deleteMany({});
    const newDishes = await Dish.insertMany(dishesSeed);
    console.log('Books Seeded!');

    await User.deleteMany({});
    const newUsers = await User.insertMany(usersSeed);
    console.log('Users Seeded!');

    // Simulación de la relación entre libros y usuarios
    for (const user of newUsers) {
        if(user.name !== "Marcos Silva"){
            const randomDish = newDishes[Math.floor(Math.random() * newDishes.length)];
            user.dishes.push(randomDish);//Le asigna una comida aleatoria a cada usuario
            await user.save();
            randomDish.clients.push(user);//Luego al la comida aleatorio seleccionado le guarda en el array clients el usuario que compro la comida.
            await randomDish.save();
            await new Rental({userId: user._id, dishId: randomDish._id, date: new Date()}).save();
        }else{
            user.dishes.push(newDishes[5]);
            user.dishes.push(newDishes[3]);
            user.dishes.push(newDishes[9]);
            await user.save();
            newDishes[5].clients.push(user);
            newDishes[3].clients.push(user);
            newDishes[9].clients.push(user);
            await newDishes[5].save();
            await newDishes[3].save();
            await newDishes[9].save();
            await new Rental({userId: user._id, dishId: newDishes[5]._id, date: new Date()}).save();
            await new Rental({userId: user._id, dishId: newDishes[3]._id, date: new Date()}).save();
            await new Rental({userId: user._id, dishId: newDishes[9]._id, date: new Date()}).save();
            
        }
        
    }

    console.log('Dishes and Users Seeded!');
    console.log("Calculating the number of dishes bought by each user in the last month");

    //Get the quiantity of books rented by each user in the last month
    for (const user of newUsers) {
        const userDishes = await Rental.find({userId: user._id, date: {$gte: new Date(new Date().setMonth(new Date().getMonth() - 1))}}).populate('dishId');
        let total = 0;
        console.log("-------------");

        userDishes.map(async (dish)=>{
            total = total + dish.dishId.price;
        })
        console.log(total);

        user.totalLastMonth = total;
        await user.save();
        
    }
  })
  .then(() => {
    mongoose.connection.close();
    console.log('Database Connection Closed!');
  })
  .catch((error) => console.log(`${error} did not connect`));

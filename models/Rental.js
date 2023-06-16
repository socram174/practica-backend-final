import mongoose from "mongoose";
const { Schema } = mongoose;

const RentalSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    dishId: { type: Schema.Types.ObjectId, ref: "Dish" },
    date: Date,
});

const Rental = mongoose.model("Rental", RentalSchema);
export default Rental;
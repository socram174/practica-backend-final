import mongoose from "mongoose";
const { Schema } = mongoose;

const RentalSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
    date: Date,
});

const Rental = mongoose.model("Rental", RentalSchema);
export default Rental;
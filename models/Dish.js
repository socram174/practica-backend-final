import mongoose from "mongoose";
const { Schema } = mongoose;

const DishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  clients: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Dish = mongoose.model("Dish", DishSchema);
export default Dish;

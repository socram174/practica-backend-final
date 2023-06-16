import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  rut: String,
  faculty: String,
  totalLastMonth: Number,
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
});

const User = mongoose.model("User", UserSchema);
export default User;

import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  faculty: String,
  date_last_reserve: Date,
  cant_reserves_last_mont: Number,
  reserves: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const User = mongoose.model("User", UserSchema);
export default User;

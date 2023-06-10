import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
  code: String,
  book: String,
  description: String,
  people: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Book = mongoose.model("Book", BookSchema);
export default Book;

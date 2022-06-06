import { Schema, model } from "mongoose";

const genreSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Genres", genreSchema);
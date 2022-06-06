import { Schema, model } from "mongoose";

const booksSchema = new Schema({
    Title: String,
    Author: String,
    PublishedYear: Number,
    Copies: Number,
    Genre: {
      type: Schema.Types.ObjectId,
      ref: "Genres",
    },
},
{
    timestamps: true,
    versionKey: false
})

export default model('Books', booksSchema);
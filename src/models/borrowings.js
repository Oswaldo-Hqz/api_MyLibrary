import { Schema, model } from "mongoose";

const borrowingsSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "Books",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        default: null
    },
},
{
    timestamps: true,
    versionKey: false
})

export default model('Borrowings', borrowingsSchema);
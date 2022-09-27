import mongoose, { Schema } from 'mongoose'

interface User {
  bookName: string
  lastName: string
  books: mongoose.Types.ObjectId[]
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      minlength: 1,
      maxlength: 25,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      minlength: 1,
      maxlength: 40,
    },
    books: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
        },
        date: { type: Date },
        returnedBook: { type: Boolean,required:[true,"Please provide if book was returned"] },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<User>('User', UserSchema)

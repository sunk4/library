import mongoose, { Schema } from 'mongoose'

interface Book {
  bookName: string
  description: string
  amount: number
}

const BookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: [true, 'Please provide book name'],
      minlength: 1,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      minlength: 1,
      maxlength: 500,
    },
    amount: {
      type: Number,
      min:0,
      default: 1,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model<Book>('Book', BookSchema)

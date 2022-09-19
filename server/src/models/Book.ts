import mongoose from 'mongoose'

interface Book {
  bookName: string,
  description:string
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
  },
  { timestamps: true }
)

export default mongoose.model<Book>('Book', BookSchema)

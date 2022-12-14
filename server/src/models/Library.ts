import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

interface Library {
  libraryName: string
  address: string
  phoneNumber: string
  books: mongoose.Types.ObjectId[]
  users: mongoose.Types.ObjectId[]
}

const LibrarySchema = new mongoose.Schema(
  {
    libraryName: {
      type: String,
      required: [true, 'Please provide library name'],
      minlength: 1,
      maxlength: 50,
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
      minlength: 1,
      maxlength: 100,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, 'Please provide phone number'],
      validate: {
        validator: validator.isMobilePhone,
        message: 'Please provide valid phone number',
      },
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<Library>('Library', LibrarySchema)

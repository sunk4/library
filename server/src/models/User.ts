import mongoose from 'mongoose'

interface User {
  bookName: string
  description: string
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
  },
  { timestamps: true }
)

export default mongoose.model<User>('User', UserSchema)

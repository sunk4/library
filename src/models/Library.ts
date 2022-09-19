import mongoose from "mongoose"

interface Library {
  libraryName: string
  address: string
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
  },
  { timestamps: true }
)

export default mongoose.model<Library>('Library', LibrarySchema)
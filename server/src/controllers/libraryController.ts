import Library from '../models/Library'
import { Request, Response } from 'express'
import CustomError from '../errors/Custom-error'

const createLibrary = async (req: Request, res: Response) => {
  const { libraryName, address, phoneNumber } = req.body

  if (!libraryName || !address || !phoneNumber) {
    throw new CustomError('Please provide all values', 400)
  }

  const library = await Library.create(req.body)
  res.status(200).json(library)
}

const updateLibrary = async (req: Request, res: Response) => {
  const { id } = req.params

  const library = await Library.findOne({ _id: id }).populate('books users' )

  if (!library) {
    throw new CustomError(`Library with ${id} does not exist`, 404)
  }

  const { libraryName, address, phoneNumber } = req.body

  if (!libraryName || !address || !phoneNumber) {
    throw new CustomError('Please provide all values', 400)
  }

  library.libraryName = libraryName
  library.address = address
  library.phoneNumber = phoneNumber

  library.save()

  res.status(200).json(library)
}

const getSingleLibrary = async (req: Request, res: Response) => {
  const { id } = req.params
  const library = await Library.findOne({ _id: id }).populate('books users' )

  res.status(200).json( library )
}

const deleteLibrary = async (req: Request, res: Response) => {
  const { id } = req.params
  const library = await Library.findOne({ _id: id })

  if (!library) {
    throw new CustomError(`Library with ${id} does not exist`, 404)
  }

  await Library.deleteOne({ _id: id })

  res.status(202).json(library)
}

const getAllLibraries = async (req: Request, res: Response) => {
  const libraries = await Library.find({}).populate('books users')

  res.status(200).json(libraries)
}

export {
  createLibrary,
  updateLibrary,
  getSingleLibrary,
  deleteLibrary,
  getAllLibraries,
}

import Book from '../src/models/Book'
import Library from '../src/models/Library'
import { Request, Response } from 'express'
import CustomError from '../src/errors/Custom-error'

const createBookAndItToLibrary = async (req: Request, res: Response) => {
  const { bookName, description } = req.body
  const { id } = req.params

  if (!bookName || !description) {
    throw new CustomError('Please provide all values', 400)
  }

  const book = await Book.create(req.body)

  const library = await Library.findOne({ _id: id })

  if (!library) {
    throw new CustomError(`Library with id: ${id} does not exist`, 404)
  }

  const newBookInLibrary = await Library.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        books: book._id,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )

  res.status(200).json({ newBookInLibrary })
}

const deleteBookFromLibrary = async (req: Request, res: Response) => {
  const { id } = req.params

  const book = await Book.findOneAndDelete({ _id: id })
  if (!book) {
    throw new CustomError(`Book with id: ${id} does not exist`, 404)
  }

  res.status(200).json({ msg: `Book with ${id} was removed` })
}

const updateAmountsOfBooks = async (req: Request, res: Response) => {
  const { id } = req.params
  const { amount } = req.body
  console.log(amount);
  
  const book = await Book.findOne({ _id: id })
  if (!book) {
    throw new CustomError(`Book with id: ${id} does not exist`, 404)
  }
  if (amount < 0) {
    throw new CustomError(`Amount have to be higher or equal to zero`, 400)
  } else {
    book.amount = amount
    book.save()
  }

  res.status(200).json({ book })
}

export { createBookAndItToLibrary, deleteBookFromLibrary, updateAmountsOfBooks }

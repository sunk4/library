import Book from '../models/Book'
import Library from '../models/Library'
import e, { Request, Response } from 'express'
import CustomError from '../errors/Custom-error'
import User from '../models/User'

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

  res.status(200).json(book)
}

const deleteBookFromLibrary = async (req: Request, res: Response) => {
  const { id } = req.params

  const book = await Book.findOneAndDelete({ _id: id })
  if (!book) {
    throw new CustomError(`Book with id: ${id} does not exist`, 404)
  }

  res.status(200).json(id)
}

const borrowBookByUser = async (req: Request, res: Response) => {
  const { bookId: _id, userId } = req.params

  const date = new Date()
  const returnedBook = false

  const checkAmountOfBook = await Book.findOne({ _id })

  if (checkAmountOfBook?.amount === 0) {
    throw new CustomError('No book in stock', 400)
  } else {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          books: { _id, date, returnedBook },
        },
      },
      { new: true, runValidators: true }
    )

    if (!user) {
      throw new CustomError(`User with id: ${userId} does not exist`, 404)
    }

    const book = await Book.findOneAndUpdate(
      {
        _id,
      },
      {
        user: userId,
        $set: {
          amount: 0,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
    if (!book) {
      throw new CustomError(`Book with id: ${_id} does not exist`, 404)
    }
    res.status(200).json(book)
  }
}

const returnTheBookByUser = async (req: Request, res: Response) => {
  const { bookId, userId } = req.params

  const date = new Date()

  const returnedBook = true
  const user = await User.findOneAndUpdate(
    { _id: userId, 'books._id': bookId },
    {
      $set: {
        'books.$._id': bookId,
        'books.$.date': date,
        'books.$.returnedBook': returnedBook,
      },
    },
    { new: true, runValidators: true }
  )

  const book = await Book.findOneAndUpdate(
    {
      _id: bookId,
    },
    {
      $set: {
        amount: 1,
      },
    },

    {
      new: true,
      runValidators: true,
    }
  )
  if (!book) {
    throw new CustomError(`Book with id: ${bookId} does not exist`, 404)
  }

  res.status(200).json({ book })
}

const getSingleBook = async (req: Request, res: Response) => {
  const { id } = req.params
  const book = await Book.findOne({ _id: id }).populate('user')

  res.status(200).json(book)
}

const editBookInLibrary = async (req: Request, res: Response) => {
  const { id } = req.params
  const { bookName, description } = req.body

  if (!bookName || !description) {
    throw new CustomError('Please provide all values', 400)
  }

  const book = await Book.findOneAndUpdate(
    { _id: id },
    { bookName, description },
    {
      new: true,
      runValidators: true,
    }
  )
  if (!book) {
    throw new CustomError(`User with id: ${id} does not exist`, 404)
  }
  res.status(200).json(book)
}

export {
  createBookAndItToLibrary,
  deleteBookFromLibrary,
  borrowBookByUser,
  returnTheBookByUser,
  getSingleBook,
  editBookInLibrary,
}

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

const updateAmountsOfBooks = async (req: Request, res: Response) => {
  const { id } = req.params
  const { amount } = req.body

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

  res.status(200).json(book)
}

const borrowBookByUser = async (req: Request, res: Response) => {
  const { bookId, userId } = req.params

  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      $push: {
        books: bookId,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!user) {
    throw new CustomError(`User with id: ${userId} does not exist`, 404)
  }

  const bookCount: any = await Book.findOne({ _id: bookId })

  if (bookCount?.amount <= 0) {
    throw new CustomError(`No stock of this book in warehouse`, 404)
  } else {
    const book = await Book.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        $push: {
          users: userId,
        },  
          
            $inc: {
              amount: -1,
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
}

const returnTheBookByUser = async (req: Request, res: Response) => {
  const { bookId, userId } = req.params
  const user = await User.findOne({ _id: userId })

  if (!user) {
    throw new CustomError(`User with id: ${userId} does not exist`, 404)
  }
  const book = await Book.findOneAndUpdate(
    {
      _id: bookId,
    },
    {
      $pull: {
        users: userId,
      },
      $inc: {
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
  const book = await Book.findOne({ _id: id }).populate('users')

  res.status(200).json( book )
}

export {
  createBookAndItToLibrary,
  deleteBookFromLibrary,
  updateAmountsOfBooks,
  borrowBookByUser,
  returnTheBookByUser,
  getSingleBook,
}

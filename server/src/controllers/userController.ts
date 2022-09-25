import User from '../models/User'
import Library from '../models/Library'
import { Request, Response } from 'express'
import CustomError from '../errors/Custom-error'

const createStudentAndAddHimToLibrary = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body
  const { id } = req.params

  if (!firstName || !lastName) {
    throw new CustomError('Please provide all values', 400)
  }

  const user = await User.create(req.body)

  const library = await Library.findOne({ _id: id })

  if (!library) {
    throw new CustomError(`Library with id: ${id} does not exist`, 404)
  }

  const newUserInLibrary = await Library.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        users: user._id,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )

  res.status(202).json(user)
}

const removeUserFromLibrary = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.findOneAndDelete({ _id: id })
  if (!user) {
    throw new CustomError(`User with id: ${id} does not exist`, 404)
  }

  res.status(200).json({id})
}

const editUserInLibrary = async (req: Request, res: Response) => {
  const { id } = req.params
  const { firstName, lastName } = req.body

  if (!firstName || !lastName) {
    throw new CustomError('Please provide all values', 400)
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { firstName, lastName },
    {
      new: true,
      runValidators: true,
    }
  )
  if (!user) {
    throw new CustomError(`User with id: ${id} does not exist`, 404)
  }
  res.status(200).json(user)
}

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.find({ _id: id }).populate('books')
  if (!user) {
    throw new CustomError(`User with id: ${id} does not exist`, 404)
  }

  res.status(200).json(user)
}

export {
  createStudentAndAddHimToLibrary,
  removeUserFromLibrary,
  editUserInLibrary,
  getSingleUser,
}

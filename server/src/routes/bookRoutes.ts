import express from 'express'
const router = express.Router()
import {
  createBookAndItToLibrary,
  deleteBookFromLibrary,
  borrowBookByUser,
  returnTheBookByUser,
  getSingleBook,
  editBookInLibrary,
} from '../controllers/bookControllers'

router.route('/book/:id').post(createBookAndItToLibrary)
router.route('/borrow/:bookId/user/:userId').patch(borrowBookByUser)
router.route('/return/:bookId/user/:userId').patch(returnTheBookByUser)

router
  .route('/:id')
  .get(getSingleBook)
  .patch(editBookInLibrary)
  .delete(deleteBookFromLibrary)

export default router

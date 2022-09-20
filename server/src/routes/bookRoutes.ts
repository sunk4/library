import express from 'express'
const router = express.Router()
import {
  createBookAndItToLibrary,
  deleteBookFromLibrary,
  updateAmountsOfBooks,
  borrowBookByUser,
  returnTheBookByUser,
} from '../../controllers/bookControllers'

router.route('/').get()
router.route('/book/:id').post(createBookAndItToLibrary)
router.route('/borrow/:bookId/user/:userId').patch(borrowBookByUser)
router.route('/return/:bookId/user/:userId').patch(returnTheBookByUser)

router
  .route('/:id')
  .get()
  .patch(updateAmountsOfBooks)
  .delete(deleteBookFromLibrary)

export default router

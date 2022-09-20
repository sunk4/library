import express from 'express'
const router = express.Router()
import {
  createBookAndItToLibrary,
  deleteBookFromLibrary,
  updateAmountsOfBooks,
  borrowBookByUser,
} from '../../controllers/bookControllers'

router.route('/').get()
router.route('/book/:id').post(createBookAndItToLibrary)
router.route('/:bookId/user/:userId').patch(borrowBookByUser)

router
  .route('/:id')
  .get()
  .patch(updateAmountsOfBooks)
  .delete(deleteBookFromLibrary)

export default router

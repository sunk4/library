import express from 'express'
const router = express.Router()
import {
  createBookAndItToLibrary,
  deleteBookFromLibrary,
} from '../../controllers/bookControllers'

router.route('/').get()
router.route("/book/:id").post(createBookAndItToLibrary)
router.route('/:id').get().patch().delete(deleteBookFromLibrary)

export default router

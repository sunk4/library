import express from 'express'
const router = express.Router()
import { createBookAndItToLibrary } from '../../controllers/bookControllers'

router.route('/').get()
router.route("/book/:id").post(createBookAndItToLibrary)
router.route('/:id').get().patch().delete()

export default router

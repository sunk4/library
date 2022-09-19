import express from 'express'
const router = express.Router()
import {
  createLibrary,
  updateLibrary,
  getSingleLibrary,
  deleteLibrary,
  getAllLibraries,
} from '../../controllers/libraryController'

router.route('/').get(getAllLibraries).post(createLibrary)
router
  .route('/:id')
  .get(getSingleLibrary)
  .patch(updateLibrary)
  .delete(deleteLibrary)

export default router

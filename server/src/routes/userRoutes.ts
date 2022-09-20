import express from 'express'
const router = express.Router()
import {
  createStudentAndAddHimToLibrary,
  removeUserFromLibrary,
  editUserInLibrary,
} from '../../controllers/userController'

router.route('/').get()
router.route('/user/:id').get().post(createStudentAndAddHimToLibrary)
router
  .route('/:id')
  .get()
  .patch(editUserInLibrary)
  .delete(removeUserFromLibrary)

export default router

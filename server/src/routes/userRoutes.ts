import express from 'express'
const router = express.Router()
import {
  createStudentAndAddHimToLibrary,
  removeUserFromLibrary,
  editUserInLibrary,
  getSingleUser,
} from '../controllers/userController'


router.route('/user/:id').post(createStudentAndAddHimToLibrary)
router
  .route('/:id')
  .get(getSingleUser)
  .patch(editUserInLibrary)
  .delete(removeUserFromLibrary)

export default router

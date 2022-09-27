import React, { Dispatch, SetStateAction } from 'react'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../features/store.hooks'
import { editSingleBookAsync } from '../../../features/libraries/bookSlice'
import { getSingleLibraryAsync } from '../../../features/libraries/librarySlice'
import { useParams } from 'react-router-dom'

interface IProps {
  setOpenEditBook: Dispatch<SetStateAction<boolean>>
  bookName: string
  description: string
  _id: string
}

const FormEditUser: React.FunctionComponent<IProps> = ({
  setOpenEditBook,
  bookName,
  description,
  _id,
}) => {
  const dispatch = useAppDispatch()
  const { libraryId } = useParams()

  const formik = useFormik({
    initialValues: {
      bookName: bookName,
      description: description,
    },
    validationSchema: Yup.object({
      bookName: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(400, 'Must be 400 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { bookName, description } = values
      dispatch(
        editSingleBookAsync({
          bookName,
          description,
          _id,
        })
      )
      formik.values.bookName = ''
      formik.values.description = ''
      dispatch(getSingleLibraryAsync(libraryId))
      setOpenEditBook(false)
    },
  })
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <h2>Edit a book</h2>
      <div>
        <label>Book name</label>
        <input
          name="bookName"
          type="text"
          placeholder="Book name"
          value={formik.values.bookName || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.bookName && formik.errors.bookName ? (
          <p>{formik.errors.bookName}</p>
        ) : null}
      </div>
      <div>
        <label>Description</label>
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={formik.values.description || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <p>{formik.errors.description}</p>
        ) : null}
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setOpenEditBook((prev)=>!prev)}>Close</button>
    </Wrapper>
  )
}

export default FormEditUser

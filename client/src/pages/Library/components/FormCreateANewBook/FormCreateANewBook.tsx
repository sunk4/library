import React, { Dispatch, SetStateAction } from 'react'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../../features/store.hooks'
import { createBookAndItToLibrary } from '../../../../features/libraries/librarySlice'

interface IProps {
  setOpenCreateNewBook: Dispatch<SetStateAction<boolean>>
  libraryId?: string 
}

const FormCreateLibrary: React.FunctionComponent<IProps> = ({
  setOpenCreateNewBook,
  libraryId,
}) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      bookName: '',
      description: '',
    },
    validationSchema: Yup.object({
      bookName: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(400, 'Must be 400 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { bookName, description } = values
      dispatch(createBookAndItToLibrary({ bookName, description, libraryId }))
      formik.values.bookName = ''
      formik.values.description = ''
      setOpenCreateNewBook(false)
    },
  })
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
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

      <button type="submit">Submit</button>
    </Wrapper>
  )
}

export default FormCreateLibrary

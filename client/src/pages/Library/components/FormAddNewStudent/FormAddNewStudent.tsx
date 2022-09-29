import React, { Dispatch, SetStateAction } from 'react'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../../features/store.hooks'
import { createStudentAndAddHimToLibraryAsync } from '../../../../features/libraries/librarySlice'

interface IProps {
  setOpenAddNewStudent: Dispatch<SetStateAction<boolean>>
  libraryId?: string
}

const FormCreateLibrary: React.FunctionComponent<IProps> = ({
  setOpenAddNewStudent,
  libraryId,
}) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { firstName, lastName } = values
      dispatch(
        createStudentAndAddHimToLibraryAsync({
          firstName,
          lastName,
          libraryId,
        })
      )
      formik.values.firstName = ''
      formik.values.lastName = ''
      setOpenAddNewStudent(false)
    },
  })
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <h2>Add student to library</h2>
      <div>
        <label>First Name</label>
        <input
          name="firstName"
          type="text"
          placeholder="First name"
          value={formik.values.firstName || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <p>{formik.errors.firstName}</p>
        ) : null}
      </div>
      <div>
        <label>Last name</label>
        <input
          name="lastName"
          type="text"
          placeholder="Last name"
          value={formik.values.lastName || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <p>{formik.errors.lastName}</p>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </Wrapper>
  )
}

export default FormCreateLibrary

import React, { Dispatch, SetStateAction } from 'react'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../../features/store.hooks'
import { editSingleUserAsync } from '../../../../features/libraries/userSlice'
import { getSingleLibraryAsync } from '../../../../features/libraries/librarySlice'
import {useParams} from "react-router-dom"



interface IProps {
  setOpenEditUser: Dispatch<SetStateAction<boolean>>
  firstName: string,
  lastName: string
  _id:string
}

const FormEditUser: React.FunctionComponent<IProps> = ({ setOpenEditUser,firstName,lastName,_id }) => {
  const dispatch = useAppDispatch()
  const { libraryId } = useParams()

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, 'Must be 50 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(30, 'Must be 40 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { firstName, lastName } = values
      dispatch(
        editSingleUserAsync({
          firstName,
          lastName,
          _id
        })
      )
      formik.values.firstName = ''
      formik.values.lastName = ''
      dispatch(getSingleLibraryAsync(libraryId))
      setOpenEditUser(false)
    },
  })
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
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

      <button type="submit">Submit</button>
    </Wrapper>
  )
}

export default FormEditUser

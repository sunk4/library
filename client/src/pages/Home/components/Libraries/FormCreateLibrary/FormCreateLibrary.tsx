import React from 'react'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../../../features/store.hooks'
import {createLibraryAsync} from "../../../../../features/libraries/librarySlice"

interface LibraryForm {
  libraryName: string
  address: string
  phoneNumber: string
}

interface IFormStatus {
  message: string
  type: string
}

const FormCreateLibrary: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const phoneRegExp =
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g

  const formik = useFormik({
    initialValues: {
      libraryName: '',
      address: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      libraryName: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      address: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { libraryName, address, phoneNumber } = values
      dispatch(createLibraryAsync({ libraryName, address, phoneNumber }))
      formik.values.libraryName = ''
      formik.values.address = ''
      formik.values.phoneNumber = ''
    },
  })
  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="libraryName"
          type="text"
          placeholder="Library name"
          value={formik.values.libraryName || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.libraryName && formik.errors.libraryName ? (
          <p>{formik.errors.libraryName}</p>
        ) : null}
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={formik.values.address || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address ? (
          <p>{formik.errors.address}</p>
        ) : null}
        <input
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={formik.values.phoneNumber || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <p>{formik.errors.phoneNumber}</p>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </Wrapper>
  )
}

export default FormCreateLibrary

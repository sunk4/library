import React from 'react'
import {
  selectLibrary,
  updateLibraryAsync,
} from '../../../../features/libraries/librarySlice'
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../features/store.hooks'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormUpdateLibrary: React.FunctionComponent = () => {
  const library: any = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()
  const { _id } = library

  const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g

  const formik = useFormik({
    initialValues: {
      libraryName: library?.libraryName,
      address: library?.address,
      phoneNumber: library?.phoneNumber,
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
      dispatch(updateLibraryAsync({ libraryName, address, phoneNumber, _id }))
      formik.values.libraryName = ''
      formik.values.address = ''
      formik.values.phoneNumber = ''
    },
  })
  return (
  
      <Wrapper onSubmit={formik.handleSubmit}>
        <input
          name="libraryName"
          type="text"
          placeholder="Library name"
          value={formik.values.libraryName || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <input
          name="address"
          type="text"
          placeholder="Address"
          value={formik.values.address || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <input
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={formik.values.phoneNumber || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <button type="submit">Submit</button>
      </Wrapper>
   
  )
}

export default FormUpdateLibrary

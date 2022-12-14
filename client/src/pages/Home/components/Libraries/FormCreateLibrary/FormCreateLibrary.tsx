import React, { Dispatch, SetStateAction } from 'react'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../../../features/store.hooks'
import { createLibraryAsync } from '../../../../../features/libraries/librarySlice'

interface IProps {
  setShowCreateForm: Dispatch<SetStateAction<boolean>>
}

const FormCreateLibrary: React.FunctionComponent<IProps> = ({
  setShowCreateForm,
}) => {
  const dispatch = useAppDispatch()

  const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g
  
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
      setShowCreateForm(false)
    },
  })
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <h2>Create a new library</h2>
      <div>
        <label>Name:</label>
        <input
          name="libraryName"
          type="text"
          placeholder="Library name"
          value={formik.values.libraryName || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.libraryName && formik.errors.libraryName ? (
        <p>{formik.errors.libraryName}</p>
      ) : null}
      <div>
        <label>Address:</label>
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={formik.values.address || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.address && formik.errors.address ? (
        <p>{formik.errors.address}</p>
      ) : null}
      <div>
        <label>Phone Number:</label>
        <input
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={formik.values.phoneNumber || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
        <p>{formik.errors.phoneNumber}</p>
      ) : null}
      <button type="submit">Submit</button>
    </Wrapper>
  )
}

export default FormCreateLibrary

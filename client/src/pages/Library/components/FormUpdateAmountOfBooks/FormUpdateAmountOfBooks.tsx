import React, { Dispatch, SetStateAction } from 'react'
import Wrapper from './Wrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../../features/store.hooks'
import { updateAmountsOfBooksAsync } from '../../../../features/libraries/librarySlice'

interface IProps {
  setOpenUpdateAmountBook: Dispatch<SetStateAction<boolean>>
  _id?: string
}

const FormUpdateAmountOfBooks: React.FunctionComponent<IProps> = ({
  setOpenUpdateAmountBook,
  _id,
}) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .min(1, 'Please add least a one book')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { amount } = values
      dispatch(
        updateAmountsOfBooksAsync({
          _id,
          amount,
        })
      )

      formik.values.amount = 1
      setOpenUpdateAmountBook(false)
    },
  })
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <input
        name="amount"
        type="number"
        placeholder="Number of books"
        value={formik.values.amount || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.amount && formik.errors.amount ? (
        <p>{formik.errors.amount}</p>
      ) : null}

      <button type="submit">Submit</button>
    </Wrapper>
  )
}

export default FormUpdateAmountOfBooks

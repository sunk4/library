import React, { useState, Dispatch, SetStateAction } from 'react'
import Wrapper from './Wrapper'
import { selectLibrary } from '../../../../features/libraries/librarySlice'
import {
  borrowBookByStudentAsync,
  
} from '../../../../features/libraries/userSlice'
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../features/store.hooks'
import { useParams } from 'react-router-dom'

interface IAppProps {
  setOpenFormBorrowBook: Dispatch<SetStateAction<boolean>>
}

const FormBorrowBook: React.FunctionComponent<IAppProps> = ({
  setOpenFormBorrowBook,
}) => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()
  const { books } = library
  const { studentId } = useParams()
  const [bookId, setBookId] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(borrowBookByStudentAsync({ bookId, studentId }))
    setOpenFormBorrowBook((prev) => !prev)
  }

  const handleChange = (e: any) => {
    const value = e.target.value
    setBookId(value)
  }


  return (
    <Wrapper>
      <h2>Borrow Book</h2>
      <label>Pick book you want to borrow</label>
      <select name="id" value={bookId} onChange={handleChange}>
        <option>Pick book</option>
        {books?.map((book: any) => {
          const { _id, bookName, amount } = book

          return (
            <option key={_id} value={_id}>
              {bookName} Amount: {amount === 0 ? 'Not in Stock' : amount}
            </option>
          )
        })}
      </select>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button
        type="button"
        onClick={() => setOpenFormBorrowBook((prev) => !prev)}
      >
        Close
      </button>
    </Wrapper>
  )
}

export default FormBorrowBook

import React, { useState } from 'react'
import Wrapper from './Wrapper'
import { selectLibrary } from '../../../../features/libraries/librarySlice'
import { borrowBookByStudentAsync } from '../../../../features/libraries/userSlice'
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../features/store.hooks'
import { useParams } from 'react-router-dom'
import { set } from 'immer/dist/internal'

interface IAppProps {}

const FormBorrowBook: React.FunctionComponent<IAppProps> = (props) => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()
  const { books } = library
  const { studentId } = useParams()
  const [bookId, setBookId] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(borrowBookByStudentAsync({ bookId, studentId }))
  }

  const handleChange = (e: any) => {
    
    const value = e.target.value
    setBookId(value)

  }

  return (
    <Wrapper>
      <label>Pick book you want to borrow</label>
      <select name="id" value="" onChange={handleChange}>
        {books.map((book: any) => {
          const { _id, bookName, amount } = book

          return (
            <option key={_id} value={_id}>
              {bookName} Amount: {amount}
            </option>
          )
        })}
      </select>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </Wrapper>
  )
}

export default FormBorrowBook

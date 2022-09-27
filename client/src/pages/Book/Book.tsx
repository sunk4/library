import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import { useAppDispatch, useAppSelector } from '../../features/store.hooks'
import {
  selectBook,
  getSingleBookAsync,
} from '../../features/libraries/bookSlice'
import { useParams } from 'react-router-dom'
import FormEditBook from './FormEditBook/FormEditBook'

interface IAppProps {}

const Book: React.FunctionComponent<IAppProps> = (props) => {
  const dispatch = useAppDispatch()
  const book = useAppSelector(selectBook)
  const [openEditBook, setOpenEditBook] = useState<boolean>(false)
  const { bookName, description } = book
  

  const { bookId } = useParams()

  useEffect(() => {
    dispatch(getSingleBookAsync(bookId))
  }, [dispatch, bookId])

  return (
    <Wrapper>
      <button onClick={() => setOpenEditBook((prev) => !prev)}>
        Edit book
      </button>
      {openEditBook && (
        <FormEditBook setOpenEditBook={setOpenEditBook} {...book} />
      )}
      <h2>Name:{bookName}</h2>
      <p>Description: {description}</p>
      <h3>Student who currently have this book</h3>
      <h4>
       Name: {book.user?.firstName} {book.user?.lastName}
      </h4>
    </Wrapper>
  )
}

export default Book

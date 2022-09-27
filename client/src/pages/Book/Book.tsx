import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import { useAppDispatch, useAppSelector } from '../../features/store.hooks'
import {
  selectBook,
  getSingleBookAsync,
} from '../../features/libraries/bookSlice'
import { useParams } from 'react-router-dom'
import FormEditBook from "./FormEditBook/FormEditBook"


interface IAppProps {}

const Book: React.FunctionComponent<IAppProps> = (props) => {
  const dispatch = useAppDispatch()
  const book = useAppSelector(selectBook)
  const [openEditBook, setOpenEditBook] = useState<boolean>(false)
  const { bookName, description, users } = book

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
      <h3>Student who borrowed this book</h3>
      {users.map((user, index) => {
        const { firstName, lastName } = user
        return (
          <div key={index}>
            {firstName} {lastName}
          </div>
        )
      })}
    </Wrapper>
  )
}

export default Book

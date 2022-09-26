import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import { useAppDispatch, useAppSelector } from '../../features/store.hooks'
import {
  selectBook,
  getSingleBookAsync,
} from '../../features/libraries/bookSlice'
import { useParams } from 'react-router-dom'
import FormEditBook from "../components/FormEditBook/FormEditBook"


interface IAppProps {}

const Book: React.FunctionComponent<IAppProps> = (props) => {
  const dispatch = useAppDispatch()
  const book = useAppSelector(selectBook)
  const [openEditBook, setOpenEditBook] = useState<boolean>(false)
  const { bookName, description, users, amount } = book

  const { bookId } = useParams()

  useEffect(() => {
    dispatch(getSingleBookAsync(bookId))
  }, [dispatch, bookId])

  return (
    <Wrapper>
      <button onClick={() => setOpenEditBook((prev) => !prev)}>
        Edit user
      </button>
      {openEditBook && (
        <FormEditBook setOpenEditBook={setOpenEditBook} {...book} />
      )}
      <h4>{bookName}</h4>
      <p>{description}</p>
      <h2>List of books borrowed</h2>
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

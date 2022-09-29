import React, { useState } from 'react'
import Wrapper from './Wrapper'
import {
  selectLibrary,
  deleteBookFromLibrary,
} from '../../../features/libraries/librarySlice'
import { useAppDispatch, useAppSelector } from '../../../features/store.hooks'
import FormCreateANewBook from '../components/FormCreateANewBook/FormCreateANewBook'
import { Link } from 'react-router-dom'

const Library: React.FunctionComponent = () => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()
  const [openCreateNewBook, setOpenCreateNewBook] = useState<boolean>(false)

  const { _id: libraryId } = library

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Are your sure u wanna delete a book?')) {
      dispatch(deleteBookFromLibrary(id))
    }
  }

  let renderBooks = library.books?.map((book:any) => {
    const { _id, bookName, description, amount } = book

    return (
      <section data-cy="single-book-section" key={_id}>
        <div>
          <h4>Name: {bookName}</h4>
          <button className="btn-delete" onClick={() => handleDeleteBook(_id)}>
            Delete book
          </button>
        </div>
        <h4>Description: </h4>
        <p>{description}</p>
        <h4>Amount: {amount}</h4>
        <Link to={`/${libraryId}/book/${_id}`}>
          <button className="btn-open-book">Open details</button>
        </Link>
      </section>
    )
  })

  return (
    <Wrapper>
      <button
        className="btn-open-modal"
        onClick={() => setOpenCreateNewBook((prev) => !prev)}
      >
        Create a new book
      </button>
      {openCreateNewBook && (
        <FormCreateANewBook
          setOpenCreateNewBook={setOpenCreateNewBook}
          libraryId={libraryId}
        />
      )}
      <div className="book-section">{renderBooks}</div>
    </Wrapper>
  )
}

export default Library

import React, { useState } from 'react'
import Wrapper from './Wrapper'
import {
  selectLibrary,
  deleteBookFromLibrary,
} from '../../../features/libraries/librarySlice'
import { useAppDispatch, useAppSelector } from '../../../features/store.hooks'
import FormCreateANewBook from '../components/FormCreateANewBook/FormCreateANewBook'
import FormUpdateAmountOfBooks from '../components/FormUpdateAmountOfBooks/FormUpdateAmountOfBooks'

const Library: React.FunctionComponent = () => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()
  const [openCreateNewBook, setOpenCreateNewBook] = useState<boolean>(false)
  const [openUpdateAmountBook, setOpenUpdateAmountBook] =
    useState<boolean>(false)
  const { _id: libraryId } = library

  let renderBooks = library.books?.map((book) => {
    const { _id, bookName, description, amount } = book

    return (
      <div key={_id}>
        <h4>{bookName}</h4>
        <h4>{description}</h4>
        <h4>{amount}</h4>
        <button onClick={() => dispatch(deleteBookFromLibrary(_id))}>
          Delete book
        </button>
        <button onClick={() => setOpenUpdateAmountBook((prev) => !prev)}>
          Update amount of books
        </button>
        {openUpdateAmountBook && (
          <FormUpdateAmountOfBooks 
            _id={_id}
            setOpenUpdateAmountBook={setOpenUpdateAmountBook}
          />
        )}
      </div>
    )
  })

  return (
    <Wrapper>
      <div>
        <button onClick={() => setOpenCreateNewBook((prev) => !prev)}>
          Create a new book
        </button>
        {openCreateNewBook && (
          <FormCreateANewBook
            setOpenCreateNewBook={setOpenCreateNewBook}
            libraryId={libraryId}
          />
        )}
      </div>
      {renderBooks}
    </Wrapper>
  )
}

export default Library

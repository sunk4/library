import React, { useState } from 'react'
import Wrapper from './Wrapper'
import { selectLibrary } from '../../features/libraries/librarySlice'
import { useAppSelector } from '../../features/store.hooks'
import FormCreateANewBook from './components/FormCreateANewBook/FormCreateANewBook'

const Library: React.FunctionComponent = () => {
  const library = useAppSelector(selectLibrary)
  const [openCreateNewBook, setOpenCreateNewBook] = useState<boolean>(false)
  const { _id: libraryId } = library

  let renderBooks = library.books?.map((book: any) => {
    const { _id, bookName, description, amount } = book

    return (
      <div key={_id}>
        <h4>{bookName}</h4>
        <h4>{description}</h4>
        <h4>{amount}</h4>
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

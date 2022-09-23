import React from 'react'
import Wrapper from './Wrapper'
import { selectLibrary } from '../../features/libraries/librarySlice'
import { useAppSelector } from '../../features/store.hooks'


const Library: React.FunctionComponent = () => {
  const library = useAppSelector(selectLibrary)

 console.log(library.books);
 
  

  let renderBooks = library.books?.map((book: any) => {
    console.log(book);
    
    const { _id, bookName, description, amount } = book
    
    

    return (
      <div key={_id}>
        <h4>{bookName}</h4>
        <h4>{description}</h4>
        <h4>{amount}</h4>
      </div>
    )
  })

  return <Wrapper>{renderBooks}</Wrapper>
}

export default Library

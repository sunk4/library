import * as React from 'react'
import Wrapper from './Wrapper'
import { selectAllLibraries } from '../../../../features/libraries/librarySlice'
import { useAppSelector } from '../../../../features/store.hooks'

interface IAppProps {}

const Libraries: React.FunctionComponent<IAppProps> = (props) => {
  const libraries = useAppSelector(selectAllLibraries)



  let renderLibrary = libraries.map((library) => {
    const { libraryName, address, phoneNumber, _id, books } = library

    return (
      <div key={_id}>
        <h3>{libraryName}</h3>
        <div>
          <p>{address}</p>
          <p>{phoneNumber}</p>
        </div>
        <p>Number of books: {books.length}</p>
        <button>Edit Library</button>
      </div>
    )
  })

  return <Wrapper>{renderLibrary}</Wrapper>
}

export default Libraries

import React from 'react'
import Wrapper from './Wrapper'
import {
  selectAllLibraries,
  deleteLibraryAsync,
  getSingleLibraryAsync,
} from '../../../../features/libraries/librarySlice'
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../features/store.hooks'
import { Link } from 'react-router-dom'

interface IAppProps {}

const Libraries: React.FunctionComponent<IAppProps> = (props) => {
  const libraries = useAppSelector(selectAllLibraries)
  const dispatch = useAppDispatch()

  const handleDeleteLibrary = (id: string) => {
    let text = 'Are you u sure u want delete library?'
    if (window.confirm(text)) {
      dispatch(deleteLibraryAsync(id))
    } else {
      return
    }
  }

  let renderLibrary = libraries.map((library) => {
    const { libraryName, address, phoneNumber, _id, books } = library

    return (
      <div key={_id}>
        <h3>{libraryName}</h3>
        <div>
          <p>{address}</p>
          <p>{phoneNumber}</p>
        </div>
        <p>Number of books: {books?.length}</p>
        <Link
          to={`/${_id}`}
          onClick={() => dispatch(getSingleLibraryAsync(_id))}
        >
          Go to library - {libraryName}
        </Link>
        <button onClick={() => handleDeleteLibrary(_id)}>Delete Library</button>
      </div>
    )
  })

  return <Wrapper>{renderLibrary}</Wrapper>
}

export default Libraries

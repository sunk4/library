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
    let text = 'Are you you sure you want to delete library?'
    if (window.confirm(text)) {
      dispatch(deleteLibraryAsync(id))
    } else {
      return
    }
  }

  let renderLibrary = libraries.map((library) => {
    const { libraryName, address, phoneNumber, _id, books } = library

    return (
      <div className="library-section" key={_id}>
        <div>
          <h2>{libraryName}</h2>
          <button onClick={() => handleDeleteLibrary(_id)}>
            Delete Library
          </button>
        </div>
        <p>
          Address: <span>{address}</span>
        </p>
        <p>
          Contact: <span>{phoneNumber}</span>
        </p>
        <p>
          Number of books: <span>{books?.length}</span>
        </p>

        <Link
          to={`/${_id}`}
          onClick={() => dispatch(getSingleLibraryAsync(_id))}
        >
          <button>Open details</button>
        </Link>
      </div>
    )
  })

  return <Wrapper>{renderLibrary}</Wrapper>
}

export default Libraries

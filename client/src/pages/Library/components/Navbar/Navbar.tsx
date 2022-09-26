import React from 'react'
import Wrapper from './Wrapper'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../../../features/store.hooks'
import { selectLibrary } from '../../../../features/libraries/librarySlice'
import { IoIosBook, IoIosPerson } from 'react-icons/io'

interface IAppProps {}

const Navbar: React.FunctionComponent<IAppProps> = (props) => {
  const library = useAppSelector(selectLibrary)
    const { _id: libraryId } = library
  return (
    <Wrapper>
      <NavLink to={`/${libraryId}`}>
        <IoIosBook className="icon" />
        Books
      </NavLink>
      <NavLink to={`/${libraryId}/student`}>
        <IoIosPerson className="icon" />
        Students
      </NavLink>
    </Wrapper>
  )
}

export default Navbar

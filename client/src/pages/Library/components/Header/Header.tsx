import React, { useState } from 'react'
import Wrapper from './Wrapper'
import { useAppSelector } from '../../../../features/store.hooks'
import { selectLibrary } from '../../../../features/libraries/librarySlice'
import FormUpdateLibrary from '../FormUpdateLibrary/FormUpdateLibrary'
import { Link } from 'react-router-dom'

const Header: React.FunctionComponent = () => {
  const library = useAppSelector(selectLibrary)
  const [openModalEditLibrary, setOpenModalEditLibrary] =
    useState<boolean>(false)

  return (
    <Wrapper>
      <Link to="/">
        <h1>{library?.libraryName}</h1>
      </Link>
      <button onClick={() => setOpenModalEditLibrary((prev: boolean) => !prev)}>
        Edit library
      </button>
      {openModalEditLibrary && (
        <FormUpdateLibrary setOpenModalEditLibrary={setOpenModalEditLibrary} />
      )}
    </Wrapper>
  )
}

export default Header

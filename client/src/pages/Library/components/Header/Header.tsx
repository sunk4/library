import React, { useState } from 'react'
import Wrapper from './Wrapper'
import { useAppSelector } from '../../../../features/store.hooks'
import { selectLibrary } from '../../../../features/libraries/librarySlice'
import FormUpdateLibrary from '../FormUpdateLibrary/FormUpdateLibrary'

const Header: React.FunctionComponent = () => {
  const library = useAppSelector(selectLibrary)
  const [openModalEditLibrary, setOpenModalEditLibrary] =
    useState<boolean>(false)

  return (
    <Wrapper>
      <div>
        {library?.libraryName}
        {library?.address}
        {library?.phoneNumber}
      </div>
      <button onClick={() => setOpenModalEditLibrary((prev: boolean) => !prev)}>
        Edit library
      </button>
      {openModalEditLibrary && <FormUpdateLibrary />}
    </Wrapper>
  )
}

export default Header

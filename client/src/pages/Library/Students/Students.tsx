import React from 'react'
import Wrapper from './Wrapper'
import { selectLibrary } from '../../../features/libraries/librarySlice'
import { useAppDispatch, useAppSelector } from '../../../features/store.hooks'

interface IAppProps {}

const Students: React.FunctionComponent<IAppProps> = (props) => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()

  const { _id: libraryId } = library

  let renderStudents = library.users?.map((student) => {
    const { _id, firstName, lastName } = student
    return (
      <div key={_id}>
        <h4>{firstName}</h4>
        <h4>{lastName}</h4>
      </div>
    )
  })

  return <Wrapper>{renderStudents}</Wrapper>
}

export default Students

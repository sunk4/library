import React from 'react'
import Wrapper from './Wrapper'
import {
  selectLibrary,
  deleteStudentFromLibraryAsync,
} from '../../../features/libraries/librarySlice'
import { useAppDispatch, useAppSelector } from '../../../features/store.hooks'

interface IAppProps {}

const Students: React.FunctionComponent<IAppProps> = (props) => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()

  const { _id: libraryId } = library

  const handleDeleteStudent = (studentId:string) => {
    window.confirm('Are you sure u wanna delete student?')
    dispatch(deleteStudentFromLibraryAsync(studentId))
  }

  let renderStudents = library.users?.map((student) => {
    const { _id, firstName, lastName } = student
    return (
      <div key={_id}>
        <h4>{firstName}</h4>
        <h4>{lastName}</h4>
        <button onClick={() => handleDeleteStudent(_id)}>Delete student</button>
      </div>
    )
  })

  return <Wrapper>{renderStudents}</Wrapper>
}

export default Students

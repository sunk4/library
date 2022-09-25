import React, { useState } from 'react'
import Wrapper from './Wrapper'
import {
  selectLibrary,
  deleteStudentFromLibraryAsync,
} from '../../../features/libraries/librarySlice'
import { useAppDispatch, useAppSelector } from '../../../features/store.hooks'
import FormAddNewStudent from '../components/FormAddNewStudent/FormAddNewStudent'
import {Link} from "react-router-dom"

interface IAppProps {}

const Students: React.FunctionComponent<IAppProps> = (props) => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()
  const [openAddNewStudent, setOpenAddNewStudent] = useState<boolean>(false)

  const { _id: libraryId } = library

  const handleDeleteStudent = (studentId: string) => {
    window.confirm('Are you sure u wanna delete student?')
    dispatch(deleteStudentFromLibraryAsync(studentId))
  }

  let renderStudents = library.users?.map((student) => {
    const { _id, firstName, lastName } = student

    return (
      <Link to={`/${libraryId}/student/${_id}`} key={_id}>
        <h4>{firstName}</h4>
        <h4>{lastName}</h4>
        <button onClick={() => handleDeleteStudent(_id)}>Delete student</button>
      </Link>
    )
  })

  return (
    <Wrapper>
      <button onClick={() => setOpenAddNewStudent((prev) => !prev)}>
        Add Student to library
      </button>
      {openAddNewStudent && (
        <FormAddNewStudent
          libraryId={libraryId}
          setOpenAddNewStudent={setOpenAddNewStudent}
        />
      )}
      {renderStudents}
    </Wrapper>
  )
}

export default Students

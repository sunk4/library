import React, { useState } from 'react'
import Wrapper from './Wrapper'
import {
  selectLibrary,
  deleteStudentFromLibraryAsync,
} from '../../../features/libraries/librarySlice'
import { useAppDispatch, useAppSelector } from '../../../features/store.hooks'
import FormAddNewStudent from '../components/FormAddNewStudent/FormAddNewStudent'
import { Link } from 'react-router-dom'

interface IAppProps {}

const Students: React.FunctionComponent<IAppProps> = (props) => {
  const library = useAppSelector(selectLibrary)
  const dispatch = useAppDispatch()
  const [openAddNewStudent, setOpenAddNewStudent] = useState<boolean>(false)

  const { _id: libraryId } = library

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure u wanna delete student?')) {
      dispatch(deleteStudentFromLibraryAsync(studentId))
    }
  }

  let renderStudents = library.users?.map((student) => {
    const { _id, firstName, lastName } = student

    return (
      <section key={_id}>
        <div data-cy="section-user" className="section-user">
          <h4>
            Name: {firstName} {lastName}
          </h4>
          <button
            className="btn-delete"
            onClick={() => handleDeleteStudent(_id)}
          >
            Delete student
          </button>
        </div>
        <Link to={`/${libraryId}/student/${_id}`} key={_id}>
          <button className="btn-open-student">Open details</button>
        </Link>
      </section>
    )
  })

  return (
    <Wrapper>
      <button
        className="btn-open-modal"
        onClick={() => setOpenAddNewStudent((prev) => !prev)}
      >
        Add Student to library
      </button>
      {openAddNewStudent && (
        <FormAddNewStudent
          libraryId={libraryId}
          setOpenAddNewStudent={setOpenAddNewStudent}
        />
      )}
      <div className="section-student">{renderStudents}</div>
    </Wrapper>
  )
}

export default Students

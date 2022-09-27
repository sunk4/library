import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import { useAppDispatch, useAppSelector } from '../../features/store.hooks'
import {
  selectUser,
  getSingleUserAsync,
} from '../../features/libraries/userSlice'
import { useParams } from 'react-router-dom'
import FormEditUser from './components/FormEditUser/FormEditUser'

interface IAppProps {}

const Student: React.FunctionComponent<IAppProps> = (props) => {
  const dispatch = useAppDispatch()
  const student = useAppSelector(selectUser)
  const [openEditUser, setOpenEditUser] = useState<boolean>(false)
  const { firstName, lastName, books } = student
  console.log(books);
  

  const { studentId } = useParams()

  useEffect(() => {
    dispatch(getSingleUserAsync(studentId))
  }, [dispatch, studentId])

  return (
    <Wrapper>
      <button onClick={() => setOpenEditUser((prev) => !prev)}>
        Edit user
      </button>
      {openEditUser && (
        <FormEditUser setOpenEditUser={setOpenEditUser} {...student} />
      )}
      <h2>
      Name:  {firstName} {lastName}
      </h2>

      <h3>List of books borrowed</h3>

    </Wrapper>
  )
}

export default Student

import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import Wrapper from './Wrapper'
import { useAppDispatch, useAppSelector } from '../../features/store.hooks'
import {
  selectUser,
  getSingleUserAsync,
  returnBookByStudentAsync,
} from '../../features/libraries/userSlice'
import { useParams } from 'react-router-dom'
import FormEditUser from './components/FormEditUser/FormEditUser'

interface IAppProps {}

const Student: React.FunctionComponent<IAppProps> = (props) => {
  const dispatch = useAppDispatch()
  const student = useAppSelector(selectUser)
  const [openEditUser, setOpenEditUser] = useState<boolean>(false)
  const { firstName, lastName, books } = student

  const { studentId } = useParams()

  useEffect(() => {
    dispatch(getSingleUserAsync(studentId))
  }, [dispatch, studentId])

 
    // dispatch(returnBookByStudentAsync({ studentId, _id }))
    


  return (
    <Wrapper>
      <button onClick={() => setOpenEditUser((prev) => !prev)}>
        Edit user
      </button>
      {openEditUser && (
        <FormEditUser setOpenEditUser={setOpenEditUser} {...student} />
      )}
      <div className='header'>
        <h2>
          Name: {firstName} {lastName}
        </h2>
        <button>Borrow Book</button>
      </div>
      <h3>List of books borrowed</h3>
      <section className="section-borrowed-books">
        {books.map((book: any) => {
          const { date, returnedBook, _id } = book
    const {_id:bookId} = _id
          

          return (
            <div key={_id._id}>
              <h4>Book name: {_id.bookName}</h4>
              {returnedBook && <h4>Date: Book was returned</h4>}
              {!returnedBook && (
                <>
                  <h4>
                    Date:{' '}
                    <Moment add={{ days: 30 }} fromNow>
                      {date}
                    </Moment>{' '}
                    please return a book
                  </h4>
                  <button >
                    Return book
                  </button>
                </>
              )}
            </div>
          )
        })}
      </section>
    </Wrapper>
  )
}

export default Student

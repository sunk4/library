import React, { useState,useEffect } from 'react'
import Wrapper from './Wrapper'
import { useAppDispatch, useAppSelector } from "../../features/store.hooks"
import {
  selectUser,
  getSingleUserAsync,
} from '../../features/libraries/userSlice'
import {useParams} from "react-router-dom"

interface IAppProps {}

const User: React.FunctionComponent<IAppProps> = (props) => {
  const dispatch = useAppDispatch()
  const student = useAppSelector(selectUser)
const {firstName,lastName} = student


  const { studentId } = useParams()

  

  

  useEffect(() => {
    dispatch(getSingleUserAsync(studentId))
  }, [dispatch, studentId])

  return (
    <div>
      <h4>{firstName}</h4>
      <h4>{lastName}</h4>
    </div>
  )
}

export default User

import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from './Wrapper'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'

const SharedLayout: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Header />
      <Navbar />
      <Outlet />
    </Wrapper>
  )
}

export default SharedLayout

import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from './Wrapper'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'

const SharedLayout: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <main>
        <Header />
        <Navbar />
        <Outlet />
      </main>
    </Wrapper>
  )
}

export default SharedLayout

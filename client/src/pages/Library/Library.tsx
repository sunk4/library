import React from 'react'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Wrapper from './Wrapper'

interface IAppProps {}

const Library: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Wrapper>
      <Header />
      <Navbar />
    </Wrapper>
  )
}

export default Library

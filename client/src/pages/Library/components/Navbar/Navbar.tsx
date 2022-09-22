import React from 'react'
import Wrapper from './Wrapper'
import {Link} from "react-router-dom"

interface IAppProps {}

const Navbar: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Wrapper>
      <h2>Books</h2>
      <h2>Students</h2>
    </Wrapper>
  )
}

export default Navbar

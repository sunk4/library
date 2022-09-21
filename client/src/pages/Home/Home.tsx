import React, { useEffect } from 'react'
import Wrapper from './Wrapper'
import Libraries from './components/Libraries/Libraries'
import { useAppDispatch, useAppSelector } from '../../features/store.hooks'
import { getAllLibrariesAsync } from '../../features/libraries/librarySlice'


interface IAppProps {}

const Home: React.FunctionComponent<IAppProps> = (props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllLibrariesAsync())
  }, [dispatch])
  
  return (
    <Wrapper>
      <section className="header">
        <h1>List of Libraries</h1>
        <button>Create a library</button>
      </section>
      <Libraries />
    </Wrapper>
  )
}

export default Home

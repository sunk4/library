import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import Libraries from './components/Libraries/Libraries'
import { useAppDispatch,  } from '../../features/store.hooks'
import { getAllLibrariesAsync } from '../../features/libraries/librarySlice'
import FormCreateLibrary from './components/Libraries/FormCreateLibrary/FormCreateLibrary'


const Home: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllLibrariesAsync())
  }, [dispatch])

  const [showCreateForm, setShowCreateForm] = useState<boolean>(false)

  return (
    <Wrapper>
      <section className="header">
        <h1>List of Libraries</h1>
        <button onClick={() => setShowCreateForm((prev) => !prev)}>
          {!showCreateForm ? 'Create a library' : 'Back to all libraries'}
        </button>
      </section>
      {!showCreateForm ? (
        <Libraries />
      ) : (
        <FormCreateLibrary setShowCreateForm={setShowCreateForm} />
      )}
    </Wrapper>
  )
}

export default Home

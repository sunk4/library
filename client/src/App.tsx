import Home from './pages/Home/Home'
import Library from './pages/Library/Library/Library'
import SharedLayout from './pages/Library/SharedLayout/SharedLayout'
import Students from './pages/Library/Students/Students'
import User from './pages/User/User'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:libraryId" element={<SharedLayout />}>
          <Route index element={<Library />} />
          <Route path="/:libraryId/student" element={<Students />} />
          <Route path="/:libraryId/student/:studentId" element={<User />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

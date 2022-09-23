import Home from './pages/Home/Home'
import Library from './pages/Library/Library'
import SharedLayout from './pages/Library/ShareLayout/SharedLayout'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:libraryId" element={<SharedLayout />}>
          <Route index element={<Library />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

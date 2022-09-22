import Home from './pages/Home/Home'
import Library from './pages/Library/Library'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:libraryId" element={<Library />}></Route>
      </Routes>
    </Router>
  )
}

export default App

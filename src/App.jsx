import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './pages/Users'
import User from './pages/User'
import './App.css'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users/>} />
          <Route path='users/:id' element={<User/>}/>
        </Routes>
    </BrowserRouter>
  )
}
export default App

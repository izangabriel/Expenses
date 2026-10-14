import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Expenses from './pages/Expenses'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import Auth from './pages/Auth'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/expenses' element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App

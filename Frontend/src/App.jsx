import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Home from './Home'
import ProtectedRoute from '../components/ProtectedRoute'
import UpdatePassword from './Authentication/UpdatePassword'

const App = () => {
  return (
  
    <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<UpdatePassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>

  )
}

export default App

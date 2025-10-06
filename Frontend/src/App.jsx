import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Home from './Home'

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>

  )
}

export default App

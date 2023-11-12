import Borrow from './pages/Borrow'
import Home from './pages/Home'
// import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './pages/User'
import Equipment from './pages/Equipment'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/borrow' element={<Borrow />} />
        <Route path='/user' element={<User />} />
        <Route path='/equipment' element={<Equipment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

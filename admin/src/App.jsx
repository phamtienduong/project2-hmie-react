import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import LayoutAdmin from './components/LayoutAdmin/LayoutAdmin'
import AdminProduct from './components/AdminProduct/AdminProduct'
import AdminUser from './components/AdminUser/AdminUser'
import AdminCategory from './components/AdminCategory/AdminCategory'
import AdminBill from './components/AdminBill/AdminBill'
import Login from './components/Login/Login'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/admin' element={<LayoutAdmin> <Outlet /> </LayoutAdmin>}>
        <Route index path='user' element={<AdminUser/>} />
        <Route path='category' element={<AdminCategory/>} />
        <Route path='product' element={<AdminProduct />} />
        <Route path='bill' element={<AdminBill/>} />
      </Route>
    </Routes>
  )
}

export default App

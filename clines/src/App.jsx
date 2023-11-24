import React, { useState } from 'react'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Main from './components/Layout/Main/Main'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { Routes, Route, Outlet } from "react-router-dom"
// import { Link } from "react-router-dom";
import Products from './pages/Products/Products'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import CartOther from './pages/CartOther/CartOther'
import CheckOut from './pages/CheckOut/CheckOut'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <><Header   /> <Outlet /> <Footer/></>}>
          <Route path="/" element={<Main />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products  />}/>
          <Route path="/productDetail" element={<ProductDetail />}/>
          <Route path="/cartOther" element={<CartOther/>}/>
          <Route path="/checkOut" element={<CheckOut/>}/>
        </Route>
      </Routes>
    </div>
  )
}

import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './Product.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


export default function Products() {
  const navigate= useNavigate()
  const [products, setProducts] = useState([]);
  const [productTotal, setProductTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  
    // get API
   
    const renderPage = () => {
      const page = []
      for (let i = 0; i < productTotal; i++){
        page.push(
            <a
              key={i}
              href="#"
              aria-current="page"
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${(i+ 1) == currentPage ? "bg-indigo-600" : "white"}
              ${(i+ 1) == currentPage ? "text-white" : "text-black"}
              `}
              onClick={() => setCurrentPage(i+1)}
            >
              {i+1}
            </a>
        )
      }
      return page
    }
    
    const handleUpDownPage = (status) => {
      switch(status) {
        case 0:
          if (currentPage == 1) {
            setCurrentPage(productTotal)
          } else {
            setCurrentPage(currentPage - 1)
          }
          break
        case 1: 
        if (currentPage == productTotal) {
          setCurrentPage(1)
        } else {
          setCurrentPage(currentPage + 1)
        }
          break
      }
    }

    useEffect(() => {
        fetch("http://localhost:7500/products")
        .then((res)=>res.json())
        .then((data)=>{
            const start = (currentPage - 1) * pageSize
            let end = (start) + pageSize

            if (end > data.length) {
              end = data.length
            }
            const newProducts = []
            data.forEach((item, index) => {
              if (index >= start && index < end) {
                newProducts.push(item)
              }
            });
            setProducts([...newProducts]); 
            setProductTotal(Math.ceil(data.length / pageSize))        
        })
    },[currentPage])
    
    const handleClickProduct = (id) => {
      localStorage.setItem("idProductDetail", id)
      navigate("/productDetail")
    }
  return (
    <div className='collection-body'>
    {products.map((item)=>(
      <div className="product-item" key={item.id}>
        <div className="product-img" onClick={() => handleClickProduct(item.id)}>
          <a ><img src={item.image} alt="img" /></a>
        </div>
        <div className="product-detail font-sans">
          <h3><a>{item.name}</a></h3>
        </div>
        <div className="box-pro-prices">
          <span>{Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
      </div>
    ))}


    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
         
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
            onClick={() => handleUpDownPage(0)}
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {/* <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a> */}
            {renderPage()}
            
            {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span> */}
           
           
            <a
            onClick={() => handleUpDownPage(1)}
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
      

    <Outlet/>
    </div>
  )
}

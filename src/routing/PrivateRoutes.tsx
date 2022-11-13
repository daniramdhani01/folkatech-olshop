import React, { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MasterLayout from '../components/MasterLayout'
import ProductDetail from '../page/ProductDetail'

function PrivateRoutes() {
  const ProductList = lazy(()=> import('../page/ProductList'))

  return (
    <Routes>
      <Route element={<MasterLayout/>}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/product-list' />} />
        {/* pages */}
        <Route path='product-list' element={<ProductList/>}/>
        <Route path='product-detail' element={<ProductDetail/>}/>
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
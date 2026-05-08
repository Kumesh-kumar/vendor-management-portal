import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AdminRoutes from './AdminRoutes'
import VenderRoutes from './VenderRoutes'
import Home from '../components/Home'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/login" />} ></Route>
            <Route path='/' element={<Home />}>
                <Route path='login' element={<Login />}></Route>
                <Route path='register' element={<Register />}></Route>
            </Route>
            {/* <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} /> */}
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>

            {/* Protected Vendor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
                <Route path="/vendor/*" element={<VenderRoutes />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
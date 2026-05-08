import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'



const AdminLayout = lazy(() => import('../layouts/AdminLayout'))

const Dashboard = lazy(() => import('../pages/admin/Dashboard'))
const VenderApproval = lazy(() => import('../pages/admin/VenderApproval'))
const VenderManagement = lazy(() => import('../pages/admin/VenderManagement'))

const ProductCatalog = lazy(() => import('../pages/admin/ProductCatalog'))

const PurchaseOrder = lazy(() => import('../pages/admin/PurchaseOrders'))

const InvoiceApproval = lazy(() => import('../pages/admin/InvoiceApproval'))

const Performance = lazy(() => import('../pages/admin/Performance'))





const AdminRoutes = () => {
    return (

        <Routes>
            <Route element={<AdminLayout />} >
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='vendor-approval' element={<VenderApproval />} />
                <Route path='vendor-management' element={<VenderManagement />} />
                <Route path='products' element={<ProductCatalog />} />
                <Route path='purchase-orders' element={<PurchaseOrder />} />
                <Route path='invoice-approval' element={<InvoiceApproval />} />
                <Route path='performance' element={<Performance />} />
            </Route>
        </Routes>

    )
}

export default AdminRoutes
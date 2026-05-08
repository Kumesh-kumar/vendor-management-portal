import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'


const VendorLayout = lazy(() => import("../layouts/VendorLayout"))
const Dashboard = lazy(() => import("../pages/vendor/Dashboard"))
const PurchaseOrders = lazy(() => import("../pages/vendor/PurchaseOrders"))
const Shipment = lazy(() => import("../pages/vendor/Shipment"))
const InvoiceSubmission = lazy(() => import("../pages/vendor/InvoiceSubmission"))
const Payments = lazy(() => import("../pages/vendor/Payments"))

const VenderRoutes = () => {
    return (
        <Routes>
            <Route element={<VendorLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='purchase-orders' element={<PurchaseOrders />} />
                <Route path='shipments' element={<Shipment />} />
                <Route path='invoice-submission' element={<InvoiceSubmission />} />
                <Route path='payments' element={<Payments />} />

            </Route>
        </Routes>
    )
}

export default VenderRoutes
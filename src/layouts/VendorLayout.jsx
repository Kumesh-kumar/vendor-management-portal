import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const VendorLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const getBreadcrumbs = () => {
        const path = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ name: 'Vendor', path: '/vendor' }];

        const routeNames = {
            'dashboard': 'Dashboard',
            'purchase-orders': 'Purchase Orders',
            'shipments': 'Shipments',
            'invoice-submission': 'Invoices',
            'payments': 'Payments'
        };

        path.forEach((segment, index) => {
            if (routeNames[segment]) {
                breadcrumbs.push({ name: routeNames[segment] });
            }
        });

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar
                role="vendor"
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                />

                <div className="bg-white border-b px-4 md:px-8 py-4 hidden md:block">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <span className="text-gray-300">›</span>}
                                <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}>
                                    {crumb.name}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default VendorLayout;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ role, isOpen, toggleSidebar }) => {
    const location = useLocation();

    const adminLinks = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Vendor Approval', path: '/admin/vendor-approval' },
        { name: 'Vendor Management', path: '/admin/vendor-management' },
        { name: 'Product Catalog', path: '/admin/products' },
        { name: 'Purchase Orders', path: '/admin/purchase-orders' },
        { name: 'Invoice Approval', path: '/admin/invoice-approval' },
        { name: 'Performance', path: '/admin/performance' },
    ];

    const vendorLinks = [
        { name: 'Dashboard', path: '/vendor/dashboard' },
        { name: 'Purchase Orders', path: '/vendor/purchase-orders' },
        { name: 'Shipments', path: '/vendor/shipments' },
        { name: 'Invoices', path: '/vendor/invoice-submission' },
        { name: 'Payments', path: '/vendor/payments' },
    ];

    const links = role === "admin" ? adminLinks : vendorLinks;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            <div className={`
                fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl 
                transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold">ERP</div>
                            <h1 className="text-2xl font-bold text-green-700"> ERP Module</h1>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden text-2xl text-gray-500"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {links.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                                    className={`block px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all
                                        ${isActive
                                            ? 'bg-green-600 text-white shadow-md'
                                            : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
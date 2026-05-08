import React from 'react';
import { FaArrowUp, FaArrowDown, FaTruck, FaFileInvoice, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Total Purchase Orders</p>
                            <p className="text-4xl font-bold mt-2">28</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <FaShoppingCart className="text-blue-600 text-2xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">15.2%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Pending Invoices</p>
                            <p className="text-4xl font-bold mt-2">5</p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-xl">
                            <FaFileInvoice className="text-orange-600 text-2xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-red-600">
                        <FaArrowDown /> <span className="font-medium">-10.5%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Shipments In Transit</p>
                            <p className="text-4xl font-bold mt-2">12</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl">
                            <FaTruck className="text-green-600 text-2xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">8.3%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Payments Due</p>
                            <p className="text-4xl font-bold mt-2">$45K</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <FaDollarSign className="text-purple-600 text-2xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">12.7%</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <button className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition">
                    <FaFileInvoice className="text-xl" />
                    Raise Invoice
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition">
                    View Purchase Orders
                </button>
                <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition">
                    Track Shipment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-5">Recent Activities</h2>
                    <div className="space-y-5">
                        {[
                            { icon: "📦", title: "PO-1001 accepted and processing", time: "10 minutes ago" },
                            { icon: "📄", title: "Invoice INV-2001 submitted", time: "2 hours ago" },
                            { icon: "🚚", title: "Shipment SHP-501 delivered", time: "5 hours ago" },
                            { icon: "💰", title: "Payment of $15,000 received", time: "1 day ago" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipment Status Tracker */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-5">Shipment Status Tracker</h2>
                    <div className="space-y-6">
                        {[
                            { id: "SHP-501", status: "In Transit", progress: 75, color: "bg-green-500" },
                            { id: "SHP-502", status: "Processing", progress: 45, color: "bg-blue-500" },
                            { id: "SHP-503", status: "Delivered", progress: 100, color: "bg-emerald-500" },
                        ].map((shipment) => (
                            <div key={shipment.id}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">{shipment.id}</span>
                                    <span className="text-sm text-gray-500">{shipment.status}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${shipment.color}`} style={{ width: `${shipment.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
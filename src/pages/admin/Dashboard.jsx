import React from 'react';
import { FaUsers, FaShoppingCart, FaFileInvoice, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    // Purchase Order Trend Data
    const poTrendData = [
        { month: 'Jan', value: 65 },
        { month: 'Feb', value: 72 },
        { month: 'Mar', value: 68 },
        { month: 'Apr', value: 85 },
        { month: 'May', value: 90 },
        { month: 'Jun', value: 98 },
    ];

    // Invoice Approval Rate Data
    const approvalData = [
        { month: 'Jan', approved: 85, pending: 15 },
        { month: 'Feb', approved: 88, pending: 12 },
        { month: 'Mar', approved: 90, pending: 10 },
        { month: 'Apr', approved: 92, pending: 8 },
        { month: 'May', approved: 95, pending: 5 },
        { month: 'Jun', approved: 93, pending: 7 },
    ];

    const recentActivities = [
        { text: "New vendor approval request", time: "5 minutes ago", status: "Pending" },
        { text: "Invoice #INV-1234 approved", time: "15 minutes ago", status: "Approved" },
        { text: "PO #PO-5678 created", time: "1 hour ago", status: "Active" },
        { text: "Payment of $50,000 released", time: "2 hours ago", status: "Completed" },
    ];

    const latestOrders = [
        { poId: "PO-1001", vendor: "Acme Corp", amount: 15000, status: "Active" },
        { poId: "PO-1002", vendor: "Global Supplies", amount: 28500, status: "Pending" },
        { poId: "PO-1003", vendor: "Tech Solutions", amount: 42000, status: "Completed" },
        { poId: "PO-1004", vendor: "Premium Goods", amount: 19800, status: "Active" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Cards - Fully Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Vendors</p>
                            <p className="text-3xl md:text-4xl font-bold mt-3">524</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-2xl">
                            <FaUsers className="text-blue-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span>12.5%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Active Purchase Orders</p>
                            <p className="text-3xl md:text-4xl font-bold mt-3">89</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-2xl">
                            <FaShoppingCart className="text-green-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span>8.2%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Pending Invoices</p>
                            <p className="text-3xl md:text-4xl font-bold mt-3">42</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-2xl">
                            <FaFileInvoice className="text-orange-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-red-600">
                        <FaArrowDown /> <span>-5.1%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Payments Released</p>
                            <p className="text-3xl md:text-4xl font-bold mt-3">$2.4M</p>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-2xl">
                            <FaDollarSign className="text-purple-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span>15.3%</span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Purchase Order Trend */}
                <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-1">Purchase Order Trend</h2>
                    <p className="text-gray-500 text-sm mb-6">Monthly PO volume</p>
                    <div className="h-72 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={poTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="natural" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Invoice Approval Rate */}
                <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-1">Invoice Approval Rate</h2>
                    <p className="text-gray-500 text-sm mb-6">Approved vs Pending</p>
                    <div className="h-72 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={approvalData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="approved" fill="#10b981" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activities & Latest Purchase Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-6">Recent Activities</h2>
                    <div className="space-y-5">
                        {recentActivities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="font-medium">{activity.text}</p>
                                    <p className="text-sm text-gray-500">{activity.time}</p>
                                </div>
                                <span className={`px-4 py-1 text-xs font-medium rounded-full ${activity.status === 'Pending' ? 'bg-orange-100 text-orange-700' : activity.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {activity.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Purchase Orders - Responsive */}
                <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-6">Latest Purchase Orders</h2>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-4 font-semibold">PO ID</th>
                                    <th className="text-left py-4 font-semibold">VENDOR</th>
                                    <th className="text-left py-4 font-semibold">AMOUNT</th>
                                    <th className="text-left py-4 font-semibold">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestOrders.map((order, i) => (
                                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="py-4 font-medium">{order.poId}</td>
                                        <td className="py-4">{order.vendor}</td>
                                        <td className="py-4 font-medium">₹{order.amount.toLocaleString()}</td>
                                        <td className="py-4">
                                            <span className="px-4 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {latestOrders.map((order, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">PO ID</p>
                                        <p className="font-semibold text-lg">{order.poId}</p>
                                    </div>
                                    <span className="px-4 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                                        {order.status}
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-500">Vendor</p>
                                        <p className="font-medium">{order.vendor}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Amount</p>
                                        <p className="font-semibold">₹{order.amount.toLocaleString()}</p>
                                    </div>
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
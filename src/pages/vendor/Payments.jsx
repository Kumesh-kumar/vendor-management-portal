import React from 'react';
import { FaArrowUp, FaArrowDown, FaDollarSign, FaClock, FaCheck } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Payments = () => {
    // Sample Payment History Data
    const paymentHistory = [
        { id: "PAY-101", invoice: "INV-2001", amount: 15000, dueDate: "2026-05-15", paymentDate: "2026-05-14", status: "Paid" },
        { id: "PAY-102", invoice: "INV-2002", amount: 28500, dueDate: "2026-05-20", paymentDate: "-", status: "Pending" },
        { id: "PAY-103", invoice: "INV-2003", amount: 42000, dueDate: "2026-05-10", paymentDate: "2026-05-09", status: "Paid" },
        { id: "PAY-104", invoice: "INV-2004", amount: 19800, dueDate: "2026-05-05", paymentDate: "-", status: "Overdue" },
    ];

    // Monthly Trends Data
    const monthlyData = [
        { month: 'Jan', amount: 85000 },
        { month: 'Feb', amount: 95000 },
        { month: 'Mar', amount: 102000 },
        { month: 'Apr', amount: 115000 },
        { month: 'May', amount: 125000 },
    ];

    const getStatusBadge = (status) => {
        if (status === "Paid") return "bg-green-100 text-green-700";
        if (status === "Pending") return "bg-orange-100 text-orange-700";
        if (status === "Overdue") return "bg-red-100 text-red-700";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Payment Tracking</h1>
                <p className="text-gray-600">Track your payments and outstanding invoices</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Total Received</p>
                            <p className="text-4xl font-bold mt-3">$125K</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-2xl">
                            <FaDollarSign className="text-green-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">18.5%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Pending Payments</p>
                            <p className="text-4xl font-bold mt-3">$45K</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-2xl">
                            <FaClock className="text-orange-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-red-600">
                        <FaArrowDown /> <span className="font-medium">-5.2%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Payments This Month</p>
                            <p className="text-4xl font-bold mt-3">12</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-2xl">
                            <FaCheck className="text-blue-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">15%</span>
                    </div>
                </div>
            </div>

            {/* Monthly Payment Trends */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
                <h2 className="text-xl font-semibold mb-2">Monthly Payment Trends</h2>
                <p className="text-gray-500 text-sm mb-6">Payment received over the last 5 months</p>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <div className="p-8 border-b">
                    <h2 className="text-xl font-semibold">Payment History</h2>
                    <p className="text-gray-500 text-sm">All payment transactions and their status</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-6 font-semibold">PAYMENT ID</th>
                                <th className="text-left p-6 font-semibold">INVOICE NUMBER</th>
                                <th className="text-left p-6 font-semibold">AMOUNT</th>
                                <th className="text-left p-6 font-semibold">DUE DATE</th>
                                <th className="text-left p-6 font-semibold">PAYMENT DATE</th>
                                <th className="text-left p-6 font-semibold">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {paymentHistory.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 transition">
                                    <td className="p-6 font-medium">{payment.id}</td>
                                    <td className="p-6">{payment.invoice}</td>
                                    <td className="p-6 font-medium">₹{payment.amount.toLocaleString()}</td>
                                    <td className="p-6">{payment.dueDate}</td>
                                    <td className="p-6 text-gray-600">{payment.paymentDate}</td>
                                    <td className="p-6">
                                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadge(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;          
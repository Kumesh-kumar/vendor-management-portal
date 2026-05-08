import React from 'react';
import { FaArrowUp, FaArrowDown, FaClock, FaStar, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Performance = () => {
    // Performance Trends Data
    const trendData = [
        { month: 'Jan', delivery: 89, quality: 92, satisfaction: 88 },
        { month: 'Feb', delivery: 91, quality: 93, satisfaction: 90 },
        { month: 'Mar', delivery: 90, quality: 94, satisfaction: 91 },
        { month: 'Apr', delivery: 94, quality: 95, satisfaction: 93 },
        { month: 'May', delivery: 96, quality: 96, satisfaction: 95 },
        { month: 'Jun', delivery: 97, quality: 97, satisfaction: 96 },
    ];

    // Vendor Comparison Data
    const comparisonData = [
        { vendor: 'Acme Corp', ontime: 96, quality: 94, response: 92 },
        { vendor: 'Global Supplies', ontime: 88, quality: 91, response: 89 },
        { vendor: 'Tech Solutions', ontime: 93, quality: 89, response: 95 },
        { vendor: 'Premium Goods', ontime: 98, quality: 96, response: 97 },
        { vendor: 'Quality Parts', ontime: 91, quality: 93, response: 90 },
    ];

    const topVendors = [
        { name: "Premium Goods", rating: 4.8, ontime: "97%", orders: 156 },
        { name: "Acme Corp", rating: 4.7, ontime: "95%", orders: 245 },
        { name: "Global Supplies", rating: 4.5, ontime: "88%", orders: 189 },
        { name: "Tech Solutions", rating: 4.4, ontime: "92%", orders: 198 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Vendor Performance</h1>
                <p className="text-gray-600">Track and analyze vendor performance metrics</p>
            </div>

            {/* KPI Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">On-time Delivery</p>
                            <p className="text-4xl font-bold mt-2">94%</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-2xl">
                            <FaChartLine className="text-green-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">5.2%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Invoice Accuracy</p>
                            <p className="text-4xl font-bold mt-2">97%</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-2xl">
                            📋
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">2.1%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Avg Response Time</p>
                            <p className="text-4xl font-bold mt-2">2.4h</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-2xl">
                            <FaClock className="text-orange-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-red-600">
                        <FaArrowDown /> <span className="font-medium">-8.5%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Overall Rating</p>
                            <p className="text-4xl font-bold mt-2">4.6</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-2xl">
                            <FaStar className="text-yellow-600 text-3xl" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                        <FaArrowUp /> <span className="font-medium">3.8%</span>
                    </div>
                </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
                <h2 className="text-xl font-semibold mb-1">Performance Trends</h2>
                <p className="text-gray-500 text-sm mb-6">Overall vendor ecosystem performance over time</p>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="natural" dataKey="delivery" stroke="#10b981" strokeWidth={3} name="Delivery %" />
                            <Line type="natural" dataKey="quality" stroke="#3b82f6" strokeWidth={3} name="Quality %" />
                            <Line type="natural" dataKey="satisfaction" stroke="#eab308" strokeWidth={3} name="Satisfaction %" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Performing Vendors */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
                <h2 className="text-xl font-semibold mb-6">Top Performing Vendors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topVendors.map((vendor, index) => (
                        <div key={index} className="border rounded-3xl p-6 hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{vendor.name}</h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaStar className="text-yellow-500" />
                                        <span className="font-medium">{vendor.rating}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-violet-600">{vendor.ontime}</p>
                                    <p className="text-sm text-gray-500">On-time</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">
                                Total Orders: <span className="font-semibold">{vendor.orders}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vendor Comparison Bar Chart */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
                <h2 className="text-xl font-semibold mb-1">Vendor Comparison</h2>
                <p className="text-gray-500 text-sm mb-6">Compare performance across vendors</p>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="vendor" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="ontime" fill="#10b981" name="On-time %" radius={6} />
                            <Bar dataKey="quality" fill="#3b82f6" name="Quality %" radius={6} />
                            <Bar dataKey="response" fill="#f59e0b" name="Response %" radius={6} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Performance;
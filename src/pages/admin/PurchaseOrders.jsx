import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { ApiEndpoints } from '../../api/ApiURLs';

const PurchaseOrders = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Fetch Purchase Orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(ApiEndpoints.fetchOrders);
                setPurchaseOrders(res.data);
                setFilteredOrders(res.data);
            } catch (err) {
                console.error("Error fetching purchase orders:", err);
                const sampleData = [
                    { id: 1, poNumber: "PO-1001", vendor: "Acme Corp", items: 15, amount: 15000, deliveryDate: "2026-05-15", status: "Active" },
                    { id: 2, poNumber: "PO-1002", vendor: "Global Supplies", items: 8, amount: 28500, deliveryDate: "2026-05-20", status: "Pending" },
                    { id: 3, poNumber: "PO-1003", vendor: "Tech Solutions", items: 22, amount: 42000, deliveryDate: "2026-05-10", status: "Completed" },
                    { id: 4, poNumber: "PO-1004", vendor: "Premium Goods", items: 12, amount: 19800, deliveryDate: "2026-05-18", status: "Active" },
                ];
                setPurchaseOrders(sampleData);
                setFilteredOrders(sampleData);
            }
        };
        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        if (status === "Active") return "bg-green-100 text-green-700";
        if (status === "Pending") return "bg-orange-100 text-orange-700";
        if (status === "Completed") return "bg-emerald-100 text-emerald-700";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
                    <p className="text-gray-600">Create and manage purchase orders</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium transition w-full sm:w-auto justify-center">
                    <FaPlus /> Create PO
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-6 font-semibold">PO NUMBER</th>
                                <th className="text-left p-6 font-semibold">VENDOR</th>
                                <th className="text-left p-6 font-semibold">ITEMS</th>
                                <th className="text-left p-6 font-semibold">AMOUNT</th>
                                <th className="text-left p-6 font-semibold">DELIVERY DATE</th>
                                <th className="text-left p-6 font-semibold">STATUS</th>
                                <th className="text-left p-6 font-semibold">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-medium text-gray-900">{order.poNumber}</td>
                                    <td className="p-6">{order.vendor}</td>
                                    <td className="p-6">{order.items}</td>
                                    <td className="p-6 font-medium">₹{order.amount.toLocaleString()}</td>
                                    <td className="p-6">{order.deliveryDate}</td>
                                    <td className="p-6">
                                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <button className="text-green-600 hover:text-green-700 font-medium hover:underline">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-mono text-sm text-gray-500">{order.poNumber}</p>
                                <h3 className="font-semibold text-lg mt-1">{order.vendor}</h3>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p className="text-gray-500">Items</p>
                                <p className="font-medium">{order.items}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Amount</p>
                                <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Delivery</p>
                                <p className="font-medium">{order.deliveryDate}</p>
                            </div>
                        </div>

                        <button className="w-full py-3 border border-gray-300 rounded-2xl text-green-600 hover:bg-gray-50 font-medium">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseOrders;
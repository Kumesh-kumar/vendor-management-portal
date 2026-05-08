import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaCalendarAlt, FaDollarSign, FaBox } from 'react-icons/fa';
import { ApiEndpoints } from '../../api/ApiURLs';

const PurchaseOrders = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(ApiEndpoints.fetchOrders);
                setPurchaseOrders(res.data);
                setFilteredOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                const sampleData = [
                    { id: 1, poNumber: "PO-1001", items: 15, amount: 15000, deliveryDate: "2026-05-15", status: "Pending", vendor: "ABC Suppliers", description: "Laptop Dell Inspiron + Accessories" },
                    { id: 2, poNumber: "PO-1002", items: 8, amount: 28500, deliveryDate: "2026-05-10", status: "Accepted", vendor: "TechZone", description: "Office Furniture Set" },
                    { id: 3, poNumber: "PO-1003", items: 22, amount: 42000, deliveryDate: "2026-05-08", status: "Fulfilled", vendor: "Global Traders", description: "Printers and Scanners" },
                ];
                setPurchaseOrders(sampleData);
                setFilteredOrders(sampleData);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Filter
    useEffect(() => {
        if (activeTab === 'All') {
            setFilteredOrders(purchaseOrders);
        } else {
            setFilteredOrders(purchaseOrders.filter(order => order.status === activeTab));
        }
    }, [activeTab, purchaseOrders]);

    const openDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    const getStatusBadge = (status) => {
        const styles = {
            Pending: "bg-yellow-100 text-yellow-700",
            Accepted: "bg-blue-100 text-blue-700",
            Fulfilled: "bg-green-100 text-green-700"
        };
        return (
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
                <p className="text-gray-600 mt-1">View and manage your purchase orders</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-sm overflow-x-auto">
                {['All', 'Pending', 'Accepted', 'Fulfilled'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Responsive Content */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left p-6 font-semibold">PO NUMBER</th>
                                    <th className="text-left p-6 font-semibold">ITEMS</th>
                                    <th className="text-left p-6 font-semibold">AMOUNT</th>
                                    <th className="text-left p-6 font-semibold">DELIVERY DATE</th>
                                    <th className="text-left p-6 font-semibold">STATUS</th>
                                    <th className="text-left p-6 font-semibold">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="p-6 font-medium">{order.poNumber}</td>
                                        <td className="p-6">{order.items}</td>
                                        <td className="p-6 font-medium">₹{order.amount.toLocaleString()}</td>
                                        <td className="p-6">{order.deliveryDate}</td>
                                        <td className="p-6">{getStatusBadge(order.status)}</td>
                                        <td className="p-6">
                                            <button
                                                onClick={() => openDetails(order)}
                                                className="text-green-600 hover:text-green-700 font-medium hover:underline"
                                            >
                                                View Details →
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">PO Number</p>
                                    <p className="font-semibold text-lg">{order.poNumber}</p>
                                </div>
                                {getStatusBadge(order.status)}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 flex items-center gap-1">
                                        <FaBox className="text-xs" /> Items
                                    </p>
                                    <p className="font-semibold mt-1">{order.items}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 flex items-center gap-1">
                                        <FaDollarSign className="text-xs" /> Amount
                                    </p>
                                    <p className="font-semibold mt-1">₹{order.amount.toLocaleString()}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-500 flex items-center gap-1">
                                        <FaCalendarAlt className="text-xs" /> Delivery Date
                                    </p>
                                    <p className="font-medium mt-1">{order.deliveryDate}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => openDetails(order)}
                                className="w-full mt-2 text-green-600 hover:text-green-700 font-medium py-2 border border-green-200 rounded-xl hover:bg-green-50 transition"
                            >
                                View Details →
                            </button>
                        </div>
                    ))}

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl">
                            No purchase orders found
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-2xl font-bold">Purchase Order Details</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">PO Number</p>
                                    <p className="text-2xl font-bold">{selectedOrder.poNumber}</p>
                                </div>
                                {getStatusBadge(selectedOrder.status)}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <FaBox /> Items
                                    </p>
                                    <p className="text-2xl font-semibold mt-1">{selectedOrder.items}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <FaDollarSign /> Amount
                                    </p>
                                    <p className="text-2xl font-semibold mt-1">₹{selectedOrder.amount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <FaCalendarAlt /> Delivery Date
                                </p>
                                <p className="text-lg font-medium mt-1">{selectedOrder.deliveryDate}</p>
                            </div>

                            {selectedOrder.vendor && (
                                <div>
                                    <p className="text-sm text-gray-500">Vendor</p>
                                    <p className="text-lg font-medium">{selectedOrder.vendor}</p>
                                </div>
                            )}

                            {selectedOrder.description && (
                                <div>
                                    <p className="text-sm text-gray-500">Description</p>
                                    <p className="text-gray-700 mt-1 leading-relaxed">{selectedOrder.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 border-t flex justify-end gap-3 bg-gray-50">
                            <button
                                onClick={closeModal}
                                className="px-6 py-3 border rounded-2xl hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseOrders;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTimes, FaTruck, FaCalendarAlt } from 'react-icons/fa';
import { ApiEndpoints } from '../../api/ApiURLs';

const Shipment = () => {
    const [shipments, setShipments] = useState([]);
    const [filteredShipments, setFilteredShipments] = useState([]);
    const [activeStatus, setActiveStatus] = useState('All');
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Create Shipment Form State
    const [formData, setFormData] = useState({
        shipmentId: `SHP-${String(Date.now()).slice(-4)}`,
        poNumber: '',
        trackingNumber: '',
        courier: '',
        dispatchDate: '',
        deliveryDate: '',
        status: 'Pending',
        notes: ''
    });

    // Fetch shipments
    const fetchShipments = async () => {
        try {
            const res = await axios.get(ApiEndpoints.fetchShipment);
            setShipments(res.data);
            setFilteredShipments(res.data);
        } catch (err) {
            console.error("Error fetching shipments:", err);
            const sampleData = [
                { id: 1, shipmentId: "SHP-501", poNumber: "PO-1001", trackingNumber: "TRK123456789", courier: "FedEx", dispatchDate: "2026-05-01", deliveryDate: "2026-05-05", status: "In-Transit" },
                { id: 2, shipmentId: "SHP-502", poNumber: "PO-1002", trackingNumber: "TRK987654321", courier: "UPS", dispatchDate: "2026-04-28", deliveryDate: "2026-05-02", status: "Delivered" },
            ];
            setShipments(sampleData);
            setFilteredShipments(sampleData);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    // Filter
    useEffect(() => {
        if (activeStatus === 'All') {
            setFilteredShipments(shipments);
        } else {
            setFilteredShipments(shipments.filter(s => s.status === activeStatus));
        }
    }, [activeStatus, shipments]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateShipment = async (e) => {
        e.preventDefault();
        try {
            const newShipment = {
                id: Date.now(),
                ...formData
            };

            await axios.post(ApiEndpoints.fetchShipment, newShipment);

            toast.success("Shipment created successfully!");
            setShowCreateModal(false);
            fetchShipments();

            // Reset form
            setFormData({
                shipmentId: `SHP-${String(Date.now()).slice(-4)}`,
                poNumber: '',
                trackingNumber: '',
                courier: '',
                dispatchDate: '',
                deliveryDate: '',
                status: 'Pending',
                notes: ''
            });
        } catch (err) {
            toast.error("Failed to create shipment");
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            "In-Transit": "bg-blue-100 text-blue-700",
            "Delivered": "bg-green-100 text-green-700",
            "Pending": "bg-orange-100 text-orange-700"
        };
        return <span className={`px-4 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Shipment Management</h1>
                    <p className="text-gray-600">Track and manage your shipments</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium transition whitespace-nowrap"
                >
                    <FaPlus /> Create Shipment
                </button>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-sm overflow-x-auto">
                {['All', 'Pending', 'In-Transit', 'Delivered'].map(status => (
                    <button
                        key={status}
                        onClick={() => setActiveStatus(status)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeStatus === status ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Responsive Display */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left p-6">SHIPMENT ID</th>
                                    <th className="text-left p-6">PO NUMBER</th>
                                    <th className="text-left p-6">TRACKING NUMBER</th>
                                    <th className="text-left p-6">COURIER</th>
                                    <th className="text-left p-6">DISPATCH DATE</th>
                                    <th className="text-left p-6">DELIVERY DATE</th>
                                    <th className="text-left p-6">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredShipments.map(shipment => (
                                    <tr key={shipment.id} className="border-t hover:bg-gray-50">
                                        <td className="p-6 font-medium">{shipment.shipmentId}</td>
                                        <td className="p-6">{shipment.poNumber}</td>
                                        <td className="p-6 font-mono">{shipment.trackingNumber}</td>
                                        <td className="p-6">{shipment.courier}</td>
                                        <td className="p-6">{shipment.dispatchDate}</td>
                                        <td className="p-6">{shipment.deliveryDate}</td>
                                        <td className="p-6">{getStatusBadge(shipment.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                    {filteredShipments.map(shipment => (
                        <div key={shipment.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">Shipment ID</p>
                                    <p className="font-semibold text-lg">{shipment.shipmentId}</p>
                                </div>
                                {getStatusBadge(shipment.status)}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">PO Number</p>
                                    <p className="font-medium">{shipment.poNumber}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Courier</p>
                                    <p className="font-medium">{shipment.courier}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Tracking No</p>
                                    <p className="font-mono text-xs">{shipment.trackingNumber}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Dispatch Date</p>
                                    <p>{shipment.dispatchDate}</p>
                                </div>
                            </div>

                            {shipment.deliveryDate && (
                                <div>
                                    <p className="text-gray-500">Est. Delivery</p>
                                    <p>{shipment.deliveryDate}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredShipments.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl">
                            No shipments found
                        </div>
                    )}
                </div>
            </div>

            {/* Create Shipment Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden">
                        <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-2xl font-bold text-gray-900">Create Shipment</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateShipment} className="p-8 space-y-6 overflow-auto max-h-[calc(95vh-80px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Shipment ID</label>
                                    <input type="text" value={formData.shipmentId} className="w-full p-4 border rounded-2xl bg-gray-50" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Select Purchase Order</label>
                                    <select name="poNumber" value={formData.poNumber} onChange={handleInputChange} required className="w-full p-4 border rounded-2xl focus:outline-none focus:border-green-500">
                                        <option value="">Select PO...</option>
                                        <option value="PO-1001">PO-1001</option>
                                        <option value="PO-1002">PO-1002</option>
                                        <option value="PO-1003">PO-1003</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Tracking Number</label>
                                    <input type="text" name="trackingNumber" value={formData.trackingNumber} onChange={handleInputChange} placeholder="Enter tracking number" required className="w-full p-4 border rounded-2xl focus:outline-none focus:border-green-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Courier Company</label>
                                    <select name="courier" value={formData.courier} onChange={handleInputChange} required className="w-full p-4 border rounded-2xl focus:outline-none focus:border-green-500">
                                        <option value="">Select courier...</option>
                                        <option value="FedEx">FedEx</option>
                                        <option value="UPS">UPS</option>
                                        <option value="DHL">DHL</option>
                                        <option value="BlueDart">BlueDart</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Dispatch Date</label>
                                    <input type="date" name="dispatchDate" value={formData.dispatchDate} onChange={handleInputChange} required className="w-full p-4 border rounded-2xl focus:outline-none focus:border-green-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Estimated Delivery</label>
                                    <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} required className="w-full p-4 border rounded-2xl focus:outline-none focus:border-green-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Notes</label>
                                <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Add delivery notes..." rows={3} className="w-full p-4 border rounded-2xl focus:outline-none focus:border-green-500" />
                            </div>

                            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl text-lg transition">
                                Create Shipment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shipment;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { ApiEndpoints } from '../../api/ApiURLs';

const VenderManagement = () => {
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    // Fetch Vendors
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const res = await axios.get(ApiEndpoints.fetchVendors);
                setVendors(res.data || []);
            } catch (err) {
                console.error("Error fetching vendors:", err);
                const sampleVendors = [
                    { id: 1, name: "Acme Corp", city: "Mohali", email: "contact@acme.com", mobile: "9876543210", status: "Active" },
                    { id: 2, name: "Global Supplies", city: "Delhi", email: "info@global.com", mobile: "9876543211", status: "Active" },
                    { id: 3, name: "Tech Solutions", city: "Chandigarh", email: "hello@tech.com", mobile: "9876543212", status: "Inactive" },
                ];
                setVendors(sampleVendors);
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, []);

    // Search + Filter Logic
    useEffect(() => {
        let result = [...vendors];

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(vendor =>
                vendor.name?.toLowerCase().includes(term) ||
                vendor.city?.toLowerCase().includes(term) ||
                vendor.email?.toLowerCase().includes(term) ||
                vendor.mobile?.toLowerCase().includes(term)
            );
        }

        if (statusFilter !== 'All') {
            result = result.filter(vendor => vendor.status === statusFilter);
        }

        setFilteredVendors(result);
    }, [searchTerm, statusFilter, vendors]);

    const getStatusBadge = (status) => {
        return status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600";
    };

    if (loading) return <p className="text-center py-10">Loading vendors...</p>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
                    <p className="text-gray-600">Manage and monitor all registered vendors</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium transition whitespace-nowrap">
                    <FaPlus /> Add Vendor
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search vendors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
                    />
                </div>

            </div>

            {/* Responsive Content */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left p-6 font-semibold">VENDOR NAME</th>
                                    <th className="text-left p-6 font-semibold">CITY</th>
                                    <th className="text-left p-6 font-semibold">EMAIL</th>
                                    <th className="text-left p-6 font-semibold">PHONE</th>
                                    <th className="text-left p-6 font-semibold">STATUS</th>
                                    <th className="text-left p-6 font-semibold">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredVendors.map((vendor) => (
                                    <tr key={vendor.id} className="hover:bg-gray-50 transition">
                                        <td className="p-6 font-medium">{vendor.name}</td>
                                        <td className="p-6">{vendor.city}</td>
                                        <td className="p-6 text-green-600">{vendor.email}</td>
                                        <td className="p-6">{vendor.mobile}</td>
                                        <td className="p-6">
                                            <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadge(vendor.status)}`}>
                                                {vendor.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex gap-4 text-gray-500">
                                                <button className="hover:text-green-600 transition"><FaEye /></button>
                                                <button className="hover:text-green-600 transition"><FaEdit /></button>
                                                <button className="hover:text-red-600 transition"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                    {filteredVendors.map((vendor) => (
                        <div key={vendor.id} className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold text-lg">{vendor.name}</p>
                                    <p className="text-gray-600">{vendor.city}</p>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadge(vendor.status)}`}>
                                    {vendor.status}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div><span className="text-gray-500">Email:</span> {vendor.email}</div>
                                <div><span className="text-gray-500">Mobile:</span> {vendor.mobile}</div>
                            </div>

                            <div className="flex justify-between pt-2">
                                <span className="flex py-3  rounded-2xl "><FaEye /></span>
                                <span className="flex py-3  rounded-2xl "><FaEdit /></span>
                                <span className="flex py-3  rounded-2xl text-red-600"><FaTrash /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VenderManagement;
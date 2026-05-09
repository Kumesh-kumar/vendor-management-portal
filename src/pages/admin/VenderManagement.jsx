import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../../redux/slices/vendorSlice';
import { FaPlus, FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const VenderManagement = () => {
    const dispatch = useDispatch();
    const { list: vendors, loading } = useSelector(state => state.vendors);

    // Fetch only if no data in store
    useEffect(() => {
        if (vendors.length === 0) {
            dispatch(fetchVendors());
        }
    }, [dispatch, vendors.length]);

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
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
                    />
                </div>
            </div>

            {/* Desktop Table */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <div className="hidden lg:block overflow-x-auto">
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
                            {vendors.map((vendor) => (
                                <tr key={vendor.id} className="hover:bg-gray-50 transition">
                                    <td className="p-6 font-medium">{vendor.name}</td>
                                    <td className="p-6">{vendor.city}</td>
                                    <td className="p-6 text-green-600">{vendor.email}</td>
                                    <td className="p-6">{vendor.mobile}</td>
                                    <td className="p-6">
                                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadge(vendor.status)}`}>
                                            {vendor.status || 'Pending'}
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

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                    {vendors.map((vendor) => (
                        <div key={vendor.id} className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold text-lg">{vendor.name}</p>
                                    <p className="text-gray-600">{vendor.city}</p>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadge(vendor.status)}`}>
                                    {vendor.status || 'Pending'}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div><span className="text-gray-500">Email:</span> {vendor.email}</div>
                                <div><span className="text-gray-500">Mobile:</span> {vendor.mobile}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VenderManagement;
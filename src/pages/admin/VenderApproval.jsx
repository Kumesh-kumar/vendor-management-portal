import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const VendorApproval = () => {
    const [pendingVendors, setPendingVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);

    const loadPendingVendors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/vendors');
            const pending = res.data.filter(v => v.status === 'Pending' || !v.status);
            setPendingVendors(pending);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadPendingVendors();
    }, []);

    const approveVendor = async (vendor) => {
        try {
            await axios.patch(`http://localhost:5000/vendors/${vendor.id}`, {
                status: "Approved",
                approvedDate: new Date().toISOString()
            });

            toast.success(`Vendor "${vendor.name}" has been Approved!`);
            loadPendingVendors();
            setSelectedVendor(null);
        } catch (err) {
            toast.error("Failed to approve");
        }
    };

    const rejectVendor = async () => {
        if (!rejectReason) {
            toast.error("Please enter rejection reason");
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/vendors/${selectedVendor.id}`, {
                status: "Rejected",
                rejectedDate: new Date().toISOString(),
                rejectReason
            });

            toast.error(`Vendor "${selectedVendor.name}" rejected`);
            setShowRejectModal(false);
            setRejectReason('');
            setSelectedVendor(null);
            loadPendingVendors();
        } catch (err) {
            toast.error("Failed to reject");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Vendor Onboarding Approval</h1>
                    <p className="text-gray-600">Review and approve new vendor registrations</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-sm">
                    Pending: <span className="font-bold text-orange-600">{pendingVendors.length}</span>
                </div>
            </div>

            {pendingVendors.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl text-center text-gray-500">
                    No pending vendor requests
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-white rounded-3xl shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-5 text-left">Name</th>
                                    <th className="p-5 text-left">Email</th>
                                    <th className="p-5 text-left">Mobile</th>
                                    <th className="p-5 text-left">Submitted</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingVendors.map(vendor => (
                                    <tr key={vendor.id} className="border-t hover:bg-gray-50">
                                        <td className="p-5 font-medium">{vendor.name}</td>
                                        <td className="p-5">{vendor.email}</td>
                                        <td className="p-5">{vendor.mobile}</td>
                                        <td className="p-5 text-sm text-gray-500">
                                            {new Date(vendor.submittedDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex gap-3 justify-center">
                                                <button onClick={() => setSelectedVendor(vendor)} className="text-blue-600 hover:text-blue-700">
                                                    <FaEye size={20} />
                                                </button>
                                                <button onClick={() => approveVendor(vendor)} className="text-green-600 hover:text-green-700">
                                                    <FaCheckCircle size={22} />
                                                </button>
                                                <button onClick={() => { setSelectedVendor(vendor); setShowRejectModal(true); }} className="text-red-600 hover:text-red-700">
                                                    <FaTimesCircle size={22} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                        {pendingVendors.map(vendor => (
                            <div key={vendor.id} className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">Vendor Name</p>
                                        <p className="font-semibold text-lg">{vendor.name}</p>
                                    </div>
                                    <span className="px-4 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full font-medium">
                                        Pending
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Email</p>
                                        <p className="font-medium">{vendor.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Mobile</p>
                                        <p className="font-medium">{vendor.mobile}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-500">Submitted</p>
                                    <p className="font-medium">{new Date(vendor.submittedDate).toLocaleDateString()}</p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setSelectedVendor(vendor)} className="flex-1 py-3 border rounded-2xl text-blue-600 hover:bg-blue-50">
                                        <FaEye className="inline mr-2" /> View
                                    </button>
                                    <button onClick={() => approveVendor(vendor)} className="flex-1 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700">
                                        Approve
                                    </button>
                                    <button onClick={() => { setSelectedVendor(vendor); setShowRejectModal(true); }} className="flex-1 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Reject Modal */}
            {showRejectModal && selectedVendor && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Reject Vendor</h3>
                        <p className="mb-4">Vendor: <strong>{selectedVendor.name}</strong></p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full h-32 p-4 border rounded-2xl focus:outline-none focus:border-red-500"
                            placeholder="Reason for rejection..."
                        />
                        <div className="flex gap-4 mt-6">
                            <button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 border rounded-2xl">Cancel</button>
                            <button onClick={rejectVendor} className="flex-1 bg-red-600 text-white py-3 rounded-2xl">Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorApproval;
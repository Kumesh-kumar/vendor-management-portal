import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import { ApiEndpoints } from '../../api/ApiURLs';

const InvoiceApproval = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const res = await axios.get(ApiEndpoints.fetchInvoices);
            setInvoices(res.data || []);
        } catch (err) {
            console.error(err);
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const approveInvoice = async (invoice) => {
        try {
            await axios.patch(ApiEndpoints.approveInvoice(invoice.id), {
                status: "Approved",
                approvedDate: new Date().toISOString()
            });
            toast.success(`Invoice ${invoice.invoiceNumber} Approved`);
            fetchInvoices();
            setSelectedInvoice(null);
        } catch (err) {
            toast.error("Failed to approve invoice");
        }
    };

    const rejectInvoice = async () => {
        if (!rejectReason.trim()) {
            toast.error("Please provide a rejection reason");
            return;
        }

        try {
            await axios.patch(ApiEndpoints.approveInvoice(selectedInvoice.id), {
                status: "Rejected",
                rejectedDate: new Date().toISOString(),
                rejectReason
            });
            toast.success(`Invoice ${selectedInvoice.invoiceNumber} Rejected`);
            setShowRejectModal(false);
            setRejectReason('');
            setSelectedInvoice(null);
            fetchInvoices();
        } catch (err) {
            toast.error("Failed to reject invoice");
        }
    };

    if (loading) return <div className="text-center py-10">Loading invoices...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Invoice Approval</h1>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-5 text-left">Invoice No</th>
                            <th className="p-5 text-left">PO Number</th>
                            <th className="p-5 text-left">Amount</th>
                            <th className="p-5 text-left">Submitted Date</th>
                            <th className="p-5 text-left">Status</th>
                            <th className="p-5 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map(invoice => (
                            <tr key={invoice.id} className="border-t hover:bg-gray-50">
                                <td className="p-5 font-medium">{invoice.invoiceNumber}</td>
                                <td className="p-5">{invoice.poNumber}</td>
                                <td className="p-5 font-medium">₹{invoice.amount}</td>
                                <td className="p-5">{new Date(invoice.submittedDate).toLocaleDateString()}</td>
                                <td className="p-5">
                                    <span className={`px-4 py-1 rounded-full text-sm ${invoice.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                        invoice.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {invoice.status || 'Submitted'}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <div className="flex gap-4 justify-center">
                                        <button onClick={() => setSelectedInvoice(invoice)} className="text-blue-600 hover:text-blue-700">
                                            <FaEye size={20} />
                                        </button>
                                        {invoice.status !== 'Approved' && invoice.status !== 'Rejected' && (
                                            <>
                                                <button onClick={() => approveInvoice(invoice)} className="text-green-600 hover:text-green-700">
                                                    <FaCheckCircle size={22} />
                                                </button>
                                                <button onClick={() => { setSelectedInvoice(invoice); setShowRejectModal(true); }} className="text-red-600 hover:text-red-700">
                                                    <FaTimesCircle size={22} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {invoices.map(invoice => (
                    <div key={invoice.id} className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium text-lg">{invoice.invoiceNumber}</p>
                                <p className="text-gray-500">PO: {invoice.poNumber}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${invoice.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                invoice.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {invoice.status || 'Submitted'}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Amount</p>
                                <p className="font-medium">₹{invoice.amount}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Submitted</p>
                                <p>{new Date(invoice.submittedDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {invoice.status !== 'Approved' && invoice.status !== 'Rejected' && (
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => approveInvoice(invoice)} className="flex-1 bg-green-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2">
                                    <FaCheckCircle /> Approve
                                </button>
                                <button onClick={() => { setSelectedInvoice(invoice); setShowRejectModal(true); }} className="flex-1 bg-red-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2">
                                    <FaTimesCircle /> Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Reject Modal */}
            {showRejectModal && selectedInvoice && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Reject Invoice</h3>
                        <p className="mb-4">Invoice: <strong>{selectedInvoice.invoiceNumber}</strong></p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full h-32 p-4 border rounded-2xl focus:outline-none focus:border-red-500"
                            placeholder="Reason for rejection..."
                        />
                        <div className="flex gap-4 mt-6">
                            <button onClick={() => { setShowRejectModal(false); setRejectReason(''); }} className="flex-1 py-3 border rounded-2xl">Cancel</button>
                            <button onClick={rejectInvoice} className="flex-1 bg-red-600 text-white py-3 rounded-2xl">Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceApproval;
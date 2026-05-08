import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const InvoiceApproval = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);

    const fetchInvoices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/invoices');
            setInvoices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const approveInvoice = async (invoice) => {
        try {
            await axios.patch(`http://localhost:5000/invoices/${invoice.id}`, {
                status: "Approved",
                approvedDate: new Date().toISOString()
            });
            toast.success(`Invoice ${invoice.invoiceNumber} Approved`);
            fetchInvoices();
            setSelectedInvoice(null);
        } catch (err) {
            toast.error("Failed to approve");
        }
    };

    const rejectInvoice = async () => {
        if (!rejectReason.trim()) {
            toast.error("Please provide a rejection reason");
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/invoices/${selectedInvoice.id}`, {
                status: "Rejected",
                rejectedDate: new Date().toISOString(),
                rejectReason
            });
            toast.error(`Invoice ${selectedInvoice.invoiceNumber} Rejected`);
            setShowRejectModal(false);
            setRejectReason('');
            setSelectedInvoice(null);
            fetchInvoices();
        } catch (err) {
            toast.error("Failed to reject");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Invoice Approval</h1>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
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
                                            invoice.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {invoice.status || 'Submitted'}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <div className="flex gap-3 justify-center">
                                        <button onClick={() => setSelectedInvoice(invoice)} className="text-blue-600">
                                            <FaEye size={20} />
                                        </button>
                                        {invoice.status !== 'Approved' && invoice.status !== 'Rejected' && (
                                            <>
                                                <button onClick={() => approveInvoice(invoice)} className="text-green-600">
                                                    <FaCheckCircle size={22} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedInvoice(invoice); setShowRejectModal(true); }}
                                                    className="text-red-600"
                                                >
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

            {/* Reject Modal */}
            {showRejectModal && selectedInvoice && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Reject Invoice</h3>
                        <p className="mb-4">Invoice: <strong>{selectedInvoice.invoiceNumber}</strong></p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full h-32 p-4 border rounded-2xl"
                            placeholder="Reason for rejection..."
                        />
                        <div className="flex gap-4 mt-6">
                            <button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 border rounded-2xl">Cancel</button>
                            <button onClick={rejectInvoice} className="flex-1 bg-red-600 text-white py-3 rounded-2xl">Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceApproval;
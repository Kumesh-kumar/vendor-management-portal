import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

const InvoiceSubmission = () => {
    const [invoices, setInvoices] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [formData, setFormData] = useState({
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        poNumber: '',
        amount: '',
        notes: ''
    });

    // Fetch Data
    useEffect(() => {
        fetchInvoices();
        fetchPOs();
    }, []);

    const fetchInvoices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/invoices');
            setInvoices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPOs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/purchaseOrders');
            setPurchaseOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitInvoice = async (e) => {
        e.preventDefault();

        if (!formData.poNumber || !formData.amount) {
            toast.error("Please fill PO Number and Amount");
            return;
        }

        try {
            const newInvoice = {
                invoiceNumber: formData.invoiceNumber,
                poNumber: formData.poNumber,
                amount: Number(formData.amount),
                submittedDate: new Date().toISOString(),
                status: "Submitted",
                notes: formData.notes || "",
                vendor: "Current Vendor"
            };

            await axios.post('http://localhost:5000/invoices', newInvoice);

            toast.success("Invoice submitted successfully for admin approval!");
            setShowCreateModal(false);
            fetchInvoices();

            setFormData({
                invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
                poNumber: '',
                amount: '',
                notes: ''
            });
        } catch (error) {
            toast.error("Failed to submit invoice");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Invoice Submission</h1>
                    <p className="text-gray-600">Create and track your invoices</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap"
                >
                    <FaPlus /> New Invoice
                </button>
            </div>

            {/* Responsive Invoices Display */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                {/* Desktop Table - Hidden on mobile */}
                <div className="hidden lg:block">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-5 text-left">Invoice No</th>
                                <th className="p-5 text-left">PO Number</th>
                                <th className="p-5 text-left">Amount</th>
                                <th className="p-5 text-left">Submitted Date</th>
                                <th className="p-5 text-left">Status</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards - Hidden on large screens */}
                <div className="lg:hidden space-y-4 p-4">
                    {invoices.map(invoice => (
                        <div key={invoice.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">Invoice Number</p>
                                    <p className="font-semibold text-lg">{invoice.invoiceNumber}</p>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-sm ${invoice.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                        invoice.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {invoice.status || 'Submitted'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">PO Number</p>
                                    <p className="font-medium">{invoice.poNumber}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Amount</p>
                                    <p className="font-semibold">₹{invoice.amount}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-500">Submitted Date</p>
                                    <p>{new Date(invoice.submittedDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {invoices.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No invoices found
                        </div>
                    )}
                </div>
            </div>

            {/* Create Invoice Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">Create New Invoice</h2>

                        <form onSubmit={handleSubmitInvoice} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">Invoice Number</label>
                                <input type="text" value={formData.invoiceNumber} readOnly className="w-full px-4 py-3 border rounded-2xl bg-gray-100" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Purchase Order *</label>
                                <select
                                    name="poNumber"
                                    value={formData.poNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-2xl"
                                    required
                                >
                                    <option value="">Select PO</option>
                                    {purchaseOrders.map(po => (
                                        <option key={po.id} value={po.poNumber}>{po.poNumber}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Amount (₹) *</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-2xl"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-2xl h-24"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 py-3 border rounded-2xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700"
                                >
                                    Submit for Approval
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceSubmission;
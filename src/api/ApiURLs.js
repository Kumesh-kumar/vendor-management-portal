export const BASE_URL = import.meta.env.VITE_API_URL;
console.log(BASE_URL)
export const ApiEndpoints = {
    fetchInvoices: `${BASE_URL}/invoices`,
    approveInvoice: (id) => `${BASE_URL}/invoices/${id}`,
    fetchProducts: `${BASE_URL}/products`,
    fetchOrders: `${BASE_URL}/purchaseOrders`,
    fetchShipment: `${BASE_URL}/shipments`,
    // vendors :---------------------
    fetchVendors: `${BASE_URL}/vendors`,

    //Admins:------------------------
    fetchAdmins: `${BASE_URL}/admin`,



}
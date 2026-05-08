import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaBarcode, FaEye } from 'react-icons/fa';
import Barcode from 'react-barcode';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/products');
                const data = res.data || [];
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                const sampleProducts = [
                    { id: 1, name: "Product A", sku: "SKU-001", category: "Electronics", price: 500, stockStatus: "In Stock" },
                    { id: 2, name: "Product B", sku: "SKU-002", category: "Hardware", price: 750, stockStatus: "In Stock" },
                    { id: 3, name: "Product C", sku: "SKU-003", category: "Software", price: 1200, stockStatus: "Low Stock" },
                    { id: 4, name: "Product D", sku: "SKU-004", category: "Accessories", price: 150, stockStatus: "Out of Stock" },
                ];
                setProducts(sampleProducts);
                setFilteredProducts(sampleProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Search Filter
    useEffect(() => {
        const term = searchTerm.toLowerCase().trim();
        if (term === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(p =>
                p.name?.toLowerCase().includes(term) ||
                p.sku?.toLowerCase().includes(term) ||
                p.category?.toLowerCase().includes(term)
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const getStockBadge = (status) => {
        if (status === "In Stock") return "bg-green-100 text-green-700";
        if (status === "Low Stock") return "bg-orange-100 text-orange-700";
        return "bg-red-100 text-red-700";
    };

    const openBarcode = (product) => setSelectedProduct(product);

    if (loading) return <div className="text-center py-10">Loading products...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
                    <p className="text-gray-600">Manage products and generate barcodes</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium">
                    <FaPlus /> Add Product
                </button>
            </div>

            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md pl-5 py-3 border border-gray-300 rounded-2xl focus:border-green-500"
            />

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full min-w-[900px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-6">PRODUCT NAME</th>
                            <th className="text-left p-6">SKU</th>
                            <th className="text-left p-6">CATEGORY</th>
                            <th className="text-left p-6">PRICE</th>
                            <th className="text-left p-6">STOCK STATUS</th>
                            <th className="text-left p-6">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="p-6 font-medium">{product.name}</td>
                                <td className="p-6 font-mono">{product.sku}</td>
                                <td className="p-6">{product.category}</td>
                                <td className="p-6 font-medium">₹{Number(product.price).toLocaleString()}</td>
                                <td className="p-6">
                                    <span className={`px-4 py-1 rounded-full text-sm ${getStockBadge(product.stockStatus)}`}>
                                        {product.stockStatus}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <button
                                        onClick={() => openBarcode(product)}
                                        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                                    >
                                        <FaBarcode /> Generate Barcode
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Barcode Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold mb-6">{selectedProduct.name}</h2>
                        <div className="bg-gray-100 p-6 rounded-2xl mb-6 inline-block">
                            <Barcode value={selectedProduct.sku} width={2} height={80} />
                        </div>
                        <p className="text-gray-600 mb-6">SKU: {selectedProduct.sku}</p>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="bg-gray-800 text-white px-8 py-3 rounded-2xl hover:bg-gray-900"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;
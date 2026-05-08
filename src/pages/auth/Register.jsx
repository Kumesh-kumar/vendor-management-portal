import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        city: ''           // Optional but good to have
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Vendor name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.mobile) newErrors.mobile = "Mobile number is required";
        if (!formData.password || formData.password.length < 2) newErrors.password = "Password must be at least 2 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const newVendor = {
                role: "vendor",
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                city: formData.city || "N/A",
                password: formData.password,
                status: "Pending",           // ← Important
                submittedDate: new Date().toISOString()
            };

            await axios.post('http://localhost:5000/vendors', newVendor);

            toast.success("Registration successful! Your account is pending admin approval.");
            navigate('/login', {
                state: { message: "Your account is under review. Please wait for admin approval." }
            });
        } catch (error) {
            toast.error("Registration failed. Make sure json-server is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-4">
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-4 md:p-6">
                <div className="text-center mb-4">

                    <h2 className="text-3xl font-bold text-gray-900">Vendor Registration</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Vendor / Company Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-2xl focus:border-green-500" placeholder="ABC Enterprises" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Company Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-2xl focus:border-green-500" placeholder="company@example.com" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-2xl focus:border-green-500" placeholder="9876543210" />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-2xl focus:border-green-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password *</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-2xl focus:border-green-500" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-2xl focus:border-green-500" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-2xl transition"
                    >
                        {loading ? "Submitting..." : "Register as Vendor"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
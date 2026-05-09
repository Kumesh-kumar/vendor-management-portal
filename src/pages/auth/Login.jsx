import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { fetchVendors, fetchAdmins } from '../../redux/slices/vendorSlice'; // Import both
import axios from 'axios';
import { setItem } from '../../utils/Storage';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const message = location.state?.message;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please fill in both email and password");
            setLoading(false);
            return;
        }

        try {
            // Fetch only if not already in store
            const vendorsState = await dispatch(fetchVendors()).unwrap();
            const adminsState = await dispatch(fetchAdmins()).unwrap();

            const allUsers = [...(vendorsState || []), ...(adminsState || [])];
            const user = allUsers.find(u => u.email === formData.email);

            if (!user || user.password !== formData.password) {
                setError("Please fill valid credentials");
                toast.error("Invalid email or password");
                setLoading(false);
                return;
            }

            if (user.role === 'vendor' && (user.status === 'Pending' || !user.status)) {
                setError("Your account is still under review.");
                navigate('/login', { state: { message: "Your account is pending admin approval." } });
                setLoading(false);
                return;
            }

            dispatch(loginSuccess({ ...user, status: user.status || 'Active' }));
            setItem("user", user);
            toast.success("Login successful!");

            navigate(user.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard');
        } catch (err) {
            console.error(err);
            setError("Login failed. Is JSON Server running?");
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 flex items-center justify-center py-8 px-4 min-h-screen">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {message && <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-2xl mb-6">{message}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-green-500" placeholder="Enter your email" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-green-500" placeholder="Enter your password" required />
                    </div>

                    {error && <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-xl">{error}</p>}

                    <button type="submit" disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-2xl disabled:opacity-70">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account? <span onClick={() => navigate('/register')} className="text-green-600 hover:underline cursor-pointer">Register as Vendor</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
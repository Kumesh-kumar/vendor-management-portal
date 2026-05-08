import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import axios from 'axios';
import { setItem } from '../../utils/Storage';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    // Show message from registration redirect
    const message = location.state?.message;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Fetch all vendors and admin
            const [vendorsRes, adminRes] = await Promise.all([
                axios.get('http://localhost:5000/vendors'),
                axios.get('http://localhost:5000/admin')
            ]);

            const allUsers = [...vendorsRes.data, ...adminRes.data];
            const user = allUsers.find(u => u.email === formData.email);

            if (!user) {
                toast.error("Invalid email or password");
                setLoading(false);
                return;
            }

            if (user.password !== formData.password) {
                toast.error("Invalid email or password");
                setLoading(false);
                return;
            }

            // Special Check for Vendor with Pending Status
            if (user?.role === 'vendor' && (user?.status === 'Pending' || user?.status === undefined)) {
                toast.error("Your account is still under review.");
                navigate('/login', {
                    state: {
                        message: "Your account is pending admin approval. You will be notified once approved."
                    }
                });
                setLoading(false);
                return;
            }

            // If approved or admin → Login successful
            dispatch(loginSuccess({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status || 'Active'
            }));

            toast.success("Login successful!");
            setItem("user", user)
            // Redirect based on role
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/vendor/dashboard');
            }

        } catch (error) {
            console.error(error);
            toast.error("Login failed. Is json-server running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-gray-50 flex items-center justify-center py-8 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10">
                <div className="text-center mb-8">

                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {message && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-2xl mb-6">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-2xl transition disabled:opacity-70"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        className="text-green-600 hover:underline cursor-pointer font-medium"
                    >
                        Register as Vendor
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
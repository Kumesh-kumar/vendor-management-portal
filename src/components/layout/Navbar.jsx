import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="bg-white shadow-md px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-4">
                {/* Hamburger Menu - Visible only on mobile */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden text-2xl text-gray-700 hover:text-green-600 transition-colors"
                >
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">

                    {user.role === "admin" ? "Admin Portal" : "VendorHub"} ERP</h2>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                {user && (
                    <div className="hidden md:flex items-center gap-3 text-sm">
                        <div className="text-right">
                            <p className="font-medium text-gray-800">{user.name}</p>
                            <p className="text-green-600 text-xs capitalize">{user.role}</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
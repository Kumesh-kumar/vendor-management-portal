import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated } = useSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (user?.role === 'vendor' && (user?.status === 'Pending' || !user?.status)) {
        return <Navigate to="/login" replace state={{
            message: "Your account is still under review. Please wait for admin approval."
        }} />;
    }
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
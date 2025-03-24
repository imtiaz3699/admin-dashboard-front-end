
import { useUser } from "../../context/userContext";
import { Outlet, Navigate } from 'react-router';

const ProtectedRoute = () => {
    const { token } = useUser();
    const checkToken = token === null || token === undefined || token === "";
    return !checkToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

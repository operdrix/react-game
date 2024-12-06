import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/User';

const ProtectedRoute = ({ children }: {
    children: React.ReactNode;
}) => {
    const { isAuthenticated, loading } = useUser();

    if (loading) {
        return <p>Loading...</p>; // ou un spinner de chargement
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;

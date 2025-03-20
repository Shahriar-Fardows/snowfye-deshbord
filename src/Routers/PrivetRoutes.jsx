import { Navigate, useLocation } from "react-router-dom";  // Import useLocation to get the current path
import useAuthContext from "../Hooks/useAuthContext";  // Import the custom hook

const PrivetRoutes = ({ children }) => {
    const { user } = useAuthContext();  // Get user from context
    const location = useLocation();  // Get the current location

    if (user) {
        return children;  // If user is authenticated, return the children (protected content)
    }

    // If not authenticated, redirect to login with the current path as the state
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivetRoutes;

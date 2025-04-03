import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

const ProtectedRoute = ({ element }) => {
    const { user, authenticated } = useContext(UserContext);

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }


    if (user.role !== "Admin") {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;

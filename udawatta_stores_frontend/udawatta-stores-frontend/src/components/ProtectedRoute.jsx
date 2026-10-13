import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({
                            children,
                            requiredRole
                        }) {

    const { user } = useContext(AuthContext);

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in, but wrong role
    if (
        requiredRole &&
        user.role !== requiredRole
    ) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
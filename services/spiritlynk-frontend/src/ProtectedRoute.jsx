import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (token && token !== "undefined" && token !== "null") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    }

    setIsChecking(false);
  }, []);

  // SHOW A VISIBLE STATE WHILE CHECKING (NO MORE BLANK NULL)
  if (isChecking)
    return (
      <div
        style={{
          color: "white",
          padding: "20px",
          fontSize: "20px",
          background: "#000",
        }}
      >
        Checking authentication...
      </div>
    );

  // REDIRECT IF NOT LOGGED IN
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

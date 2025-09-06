import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AuthSuccess = () => {
    const navigate = useNavigate();
  
    
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
  
      if (token) {
        localStorage.setItem("token", token); // save token
        navigate("/"); // redirect to home/dashboard
      } else {
        navigate("/"); // fallback if no token
      }
    }, [navigate]);
  
    return <div>Logging you in...</div>;
  
  };
  
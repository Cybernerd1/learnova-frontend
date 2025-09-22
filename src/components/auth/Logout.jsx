import React, { useState } from 'react';
import { LogOut, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api.js";

const Logout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      // Simulate logout process
      setTimeout(() => {
        setIsLoggingOut(false);
        setShowPopup(false);
        // Here you would typically:
        // 1. Clear user session/tokens
        // 2. Redirect to login page
        // 3. Clear user data from state management
        toast.success(response.data.message || "Successfully logged out!");
        Navigate('/')

      }, 1000);

    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.clear();
      navigate('/')
      toast.success("Logged out successfully")
    }


  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Demo Content */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        <button
          onClick={handleLogoutClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Backdrop Overlay */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Popup Container */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="text-red-600" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Confirm Logout
                </h2>
              </div>
              <button
                onClick={handleCancelLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                disabled={isLoggingOut}
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to logout? You'll need to sign in again to access your account.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut size={16} />
                      Logout
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
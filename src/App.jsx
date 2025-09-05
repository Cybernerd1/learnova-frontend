import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./lib/ProtectedRoute";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Classroom from "./pages/Classroom";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";



function App() {
  const token = localStorage.getItem("token")

  return (
    <>

      <Routes>
        <Route path="/" element={(token) ? (<ProtectedRoute><Dashboard /></ProtectedRoute>) : (<Homepage />)} />
        <Route path="/Classroom" element={<ProtectedRoute><Classroom /></ProtectedRoute>} />
        <Route path="/Community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/Messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/Notification" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
        <Route path="/Settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>

    </>
  );
}

export default App;

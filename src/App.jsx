import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./lib/ProtectedRoute";

import {AuthSuccess} from "./components/auth/AuthSuccess";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Classroom from "./pages/Classroom";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Layout from "./pages/Layout";


function App() {
  const token = localStorage.getItem("token")

  return (
    <>

      <Routes>
        <Route path="/" element={(token) ? (<ProtectedRoute><Layout><Dashboard /></Layout> </ProtectedRoute>) : (<Homepage />)} />
        
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/community" element={<Community />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;

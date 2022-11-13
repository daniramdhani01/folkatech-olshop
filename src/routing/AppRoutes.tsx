import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { AuthInit, useAuth } from "../moduls/Auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";

function AppRoutes() {
  const { currentUser, getAuth } = useAuth();
  // getAuth();
  return (
    <AuthInit>
      <BrowserRouter>
        <Routes>
          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/product-list" />} />
              <Route index element={<>daniiii</>} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthRoutes />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthInit>
  );
}

export default AppRoutes;

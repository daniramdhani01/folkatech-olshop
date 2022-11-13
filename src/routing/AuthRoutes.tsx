import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../page/Login";
import Register from "../page/Register";

function AuthRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}

export default AuthRoutes;

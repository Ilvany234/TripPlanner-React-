import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import BgCanvas from "./components/BgCanvas";

import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Comentarios from "./pages/Comentarios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CrudDestinos from "./pages/CrudDestinos";
import Perfil from "./pages/Perfil";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BgCanvas />
      <SiteNavbar />
      <main style={{ paddingTop: "4.5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/comentarios" element={<Comentarios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-destinos" element={<CrudDestinos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;

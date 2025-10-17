import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import BgCanvas from "./components/BgCanvas";

import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Comentarios from "./pages/Comentarios";

function App() {
  return (
    <>
      <BgCanvas />
      <SiteNavbar />
      <main style={{ paddingTop: "4.5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/comentarios" element={<Comentarios />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

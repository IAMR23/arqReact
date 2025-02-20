import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/SF";
import CrearFactura from "./pages/ERP";
import Listar from "./pages/SRI";
import ERP from "./pages/ERP";
import SRI from "./pages/SRI";
import SF from "./pages/SF";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark p-4">
        <Link to={"/"} className="navbar-brand">
          Ininio
        </Link>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/erp" element={<ERP />} />
          <Route path="/sri" element={<SRI />} />
          <Route path="/sistemafinanciero" element={<SF />} />
          {/*    <Route path="/factura" element={<ProductList />} />
          <Route path="/products/create" element={<ProductForm />} />
          <Route path="/products/retrieve/:id" element={<ProductCard />} />
          <Route path="/products/update/:id" element={<ProductForm />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

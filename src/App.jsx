import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ERP from "./pages/ERP";
import SRI from "./pages/SRI";
import SF from "./pages/SF";
import VerCuenta from "./components/VerCuenta";
function App() {
  return (
    <div>
      <div className="container mt-3">
        <Routes>
          <Route path="/erp" element={<ERP />} />
          <Route path="/sri" element={<SRI />} />
          <Route path="/cuentas" element={<SF />} />
          <Route path="/cuenta/:id" element={<VerCuenta />} />
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

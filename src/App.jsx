import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark p-4">
        <Link to={"/"} className="navbar-brand">
          Ininio
        </Link>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
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

import React, { useState } from "react";
import axios from "axios";
import ListarFacturas from "../components/ListarFacturas";

export default function ERP() {
  const [formData, setFormData] = useState({
    cliente: "Ismael",
    monto: 150,
    impuestos: 0.12,
    estado: "pendiente",
    metodo_pago: "Ninguno",
  });
  const [mensaje, setMensaje] = useState("");

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        //"http://localhost:8081/api/facturas",
        "http://localhost:7000/facturas",
        formData
      );
      setMensaje(`Factura creada exitosamente con ID: ${response.data.id}`);
      console.log(response.data);
    } catch (error) {
      setMensaje("Error al crear la factura");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Nueva Factura</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente:</label>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Monto:</label>
          <input
            type="number"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Impuestos:</label>
          <input
            type="number"
            name="impuestos"
            value={formData.impuestos}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Método de Pago:</label>
          <select
            name="metodo_pago"
            value={formData.metodo_pago}
            onChange={handleChange}
          >
            <option value="Ninguno">Ninguno</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
        <button type="submit">Crear Factura</button>
      </form>
      {mensaje && <p>{mensaje}</p>}

      <ListarFacturas />
    </div>
  );
}

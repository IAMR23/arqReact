import React, { useState } from "react";
import axios from "axios";
import ListarFacturas from "../components/ListarFacturas";

export default function ERP() {
  const [formData, setFormData] = useState({
    cliente: "Ismael",
    monto: 150,
    estado: "pendiente",
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
    console.log(formData);
    e.preventDefault();
    console.log("cp1", formData);

    try {
      const response = await axios.post(
        //"http://127.0.0.1:8081/api/facturas",

        "http://localhost:7000/facturas",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Especificamos que el contenido es JSON
          },
        }
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
      <h1>Sistema de Facturacion</h1>
      <form
        className="text-center flex flex-col text-3xl"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-2xl text-red-500">Cliente:</label>
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
          <label>Estado:</label>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Factura</button>
      </form>
      {mensaje && <p>{mensaje}</p>}

      <ListarFacturas />
    </div>
  );
}

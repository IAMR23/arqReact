import React, { useState, useEffect } from "react";
import axios from "axios";
import ListarFacturas from "../components/ListarFacturas";

export default function ERP() {
  const [formData, setFormData] = useState({
    cliente: "Ismael",
    monto: 150,
    estado: "pendiente",
  });
  const [facturas, setFacturas] = useState([]); // Nuevo estado para facturas
  const [mensaje, setMensaje] = useState("");

  // Cargar las facturas al montar el componente
  useEffect(() => {
    fetchFacturas();
  }, []);

  // Función para obtener facturas
  const fetchFacturas = async () => {
    try {
      const response = await axios.get("http://localhost:7000/facturas");
      setFacturas(response.data); // Actualiza el estado con las facturas obtenidas
    } catch (error) {
      console.error("Error al obtener facturas:", error);
    }
  };

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
        "http://localhost:7000/facturas",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMensaje("Factura creada exitosamente");

      // Actualizar la lista de facturas sin recargar la página
      setFacturas([...facturas, response.data]);
    } catch (error) {
      setMensaje("Error al crear la factura");
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold uppercase mb-6 text-center">
        Sistema de Facturación
      </h1>

      <div className="container mx-auto flex justify-center items-center bg-gray-400">
        <div className="p-6">
          <form
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-6 text-black"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold">Ingreso de Facturas</h2>

            {/* Cliente */}
            <div>
              <label className="font-semibold text-lg text-gray-700 mb-2">
                Cliente:
              </label>
              <input
                type="text"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Monto */}
            <div>
              <label className="font-semibold text-lg text-gray-700 mb-2">
                Monto:
              </label>
              <input
                type="number"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="font-semibold text-lg text-gray-700 mb-2">
                Estado:
              </label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Botón de Enviar */}
            <button
              type="submit"
              className="bg-blue-400 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-800 transition"
            >
              Crear Factura
            </button>
          </form>

          {/* Mensaje de Confirmación */}
          {mensaje && (
            <p className="p-4 font-bold text-center text-xl text-green-500 mt-4">
              {mensaje}
            </p>
          )}
        </div>

        {/* Pasar las facturas como prop al componente ListarFacturas */}
        <ListarFacturas facturas={facturas} />
      </div>
    </>
  );
}

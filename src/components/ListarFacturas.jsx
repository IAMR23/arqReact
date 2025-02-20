import React, { useState, useEffect } from "react";

export default function ListarFacturas() {
  const [facturas, setFacturas] = useState([]); // Estado para almacenar las facturas
  const [error, setError] = useState(null); // Para manejar posibles errores

  // Función para obtener las facturas desde el backend
  const obtenerFacturas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:7000/facturas");

      if (!response.ok) {
        throw new Error("Error al obtener las facturas");
      }

      const data = await response.json(); // Convertir la respuesta en JSON
      setFacturas(data); // Actualizar el estado con las facturas
    } catch (error) {
      setError(error.message); // Manejo de errores
    }
  };

  // useEffect se ejecutará solo una vez al montar el componente
  useEffect(() => {
    obtenerFacturas(); // Llamar la función para cargar las facturas al montar el componente
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  // Función para agregar una nueva factura (simulando la creación de una factura)
  const crearFactura = async () => {
    const nuevaFactura = {
      cliente: "Nuevo Cliente",
      monto: 100.0,
      impuestos: 10.0,
      estado: "pendiente",
      metodo_pago: "Tarjeta",
    };

    try {
      const response = await fetch("http://127.0.0.1:7000/facturas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaFactura),
      });

      if (!response.ok) {
        throw new Error("Error al crear la factura");
      }

      // Después de crear la factura, volvemos a obtener las facturas actualizadas
      obtenerFacturas();
    } catch (error) {
      setError(error.message); // Manejo de errores
    }
  };

  // Función para enviar una factura al SRI
  const enviarAlSRI = async (facturaId) => {
    try {
      // Buscar la factura por ID
      const factura = facturas.find((f) => f.id === facturaId);

      if (!factura) {
        setError("Factura no encontrada");
        return;
      }

      const response = await fetch("http://127.0.0.1:7000/sri/impuestos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: factura.id,
          cliente: factura.cliente,
          monto: factura.monto,
          impuestos: factura.impuestos,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la factura al SRI");
      }

      const data = await response.json(); // Procesar la respuesta
      alert("Factura enviada al SRI exitosamente: " + data.estado); // Mostrar mensaje de éxito
    } catch (error) {
      setError(error.message); // Manejo de errores
    }
  };

  return (
    <div>
      <h2>Facturas Registradas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <ul>
        {facturas.length > 0 ? (
          facturas.map((factura) => (
            <li key={factura.id}>
              <p>
                <strong>Cliente:</strong> {factura.cliente}
              </p>
              <p>
                <strong>Monto:</strong> {factura.monto}
              </p>
              <p>
                <strong>Impuestos:</strong> {factura.impuestos}
              </p>
              <p>
                <strong>Estado:</strong> {factura.estado}
              </p>
              <p>
                <strong>Método de Pago:</strong> {factura.metodo_pago}
              </p>

              {/* Botón para enviar la factura al SRI */}
              <button onClick={() => enviarAlSRI(factura.id)}>
                Enviar al SRI
              </button>
            </li>
          ))
        ) : (
          <p>No hay facturas registradas.</p> // Mensaje si no hay facturas
        )}
      </ul>
    </div>
  );
}

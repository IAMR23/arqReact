import React, { useEffect, useState } from "react";

export default function ListarFacturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    // Obtener las facturas desde el endpoint
    const fetchFacturas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:7000/sri/facturas");
        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error("Error al obtener las facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  const actualizarEstado = async (facturaId, estado) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:7000/sri/facturas/${facturaId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: estado, // Solo el campo estado que quieres actualizar
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el estado de la factura");
      }

      const data = await response.json();
      console.log("Factura actualizada", data);
    } catch (error) {
      console.error("Error al actualizar la factura", error);
    }
  };

  return (
    <div>
      <h2>Facturas Registradas</h2>
      <ul>
        {facturas.map((factura) => (
          <li key={factura.id}>
            <p>Cliente: {factura.cliente}</p>
            <p>Monto: {factura.monto}</p>
            <p>Impuestos: {factura.impuestos}</p>
            <p>
              Estado:
              <select
                value={factura.estado}
                onChange={(e) => actualizarEstado(factura.id, e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="no aprobado">No Aprobado</option>
              </select>
            </p>
            <p>Método de Pago: {factura.metodo_pago}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

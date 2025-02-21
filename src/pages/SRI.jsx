import React, { useEffect, useState } from "react";

export default function ListarFacturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    // Obtener las facturas desde el endpoint
    const fetchFacturas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:7000/sri/facturas");
        if (!response.ok) {
          throw new Error("Error al obtener las facturas");
        }
        const data = await response.json();
        console.log(data);
        // Asegurar que `data` es un array antes de asignarlo
        setFacturas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener las facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  return (
    <div>
      <h2>Facturas Registradas</h2>
      {facturas.length === 0 ? (
        <p>No hay facturas registradas.</p>
      ) : (
        <ul>
          {facturas.map((factura) => (
            <li key={factura.id}>
              <p>Id: {factura.id}</p>
              <p>Cliente: {factura.cliente}</p>
              <p>Monto: {factura.monto}</p>
              <p>Impuestos: {factura.impuestos}</p>
              <p>Estado: {factura.estado}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

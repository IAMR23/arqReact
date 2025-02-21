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

  const enviarSF = async (facturaData) => {
    try {
      const facturaSRI = {
        cliente: facturaData.cliente,
        total: facturaData.monto + facturaData.monto * 0.12,
        estado: "Aprobado",
      };

      console.log("Enviando del SRI a la cuenta", facturaSRI);

      // Ahora que tenemos los datos completos, enviamos la factura al SRI
      const response = await fetch("http://127.0.0.1:7000/cuenta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facturaSRI), // Enviamos la factura completa al SRI
      });
      console.log("Respuesta del SF:", response);

      if (!response.ok) {
        const errorData = await response.json(); // Lee el cuerpo de la respuesta
        console.error("Detalles del error:", errorData);
        throw new Error("Error al registrar la cuenta");
      }

      const data = await response.json();
      console.log("Cuenta creada exitosamente:", data);
    } catch (error) {
      console.error("Error al registrar la cuenta:", error);
    }
  };

  return (
    <div>
      <h2>SRI</h2>
      {facturas.length === 0 ? (
        <p>No hay facturas registradas.</p>
      ) : (
        <ul>
          {facturas.map((factura) => (
            <li key={factura.id}>
              <p>Cliente: {factura.cliente}</p>
              <p>Monto: {factura.monto}</p>
              <p>Estado: {factura.estado}</p>
              <button onClick={() => enviarSF(factura)}>Aprobar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

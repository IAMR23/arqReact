import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Buen trabajo!",
        text: "Factura Aprobada!",
        icon: "success",
      });

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
    <>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
          SRI
        </h2>
        {facturas.length === 0 ? (
          <p className="text-center text-gray-400">
            No hay facturas registradas.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facturas.map((factura) => (
              <li
                key={factura.id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700"
              >
                <p className="text-gray-300">
                  <strong className="text-purple-400">Cliente:</strong>{" "}
                  {factura.cliente}
                </p>
                <p className="text-gray-300 mt-2">
                  <strong className="text-purple-400">Monto:</strong>{" "}
                  {factura.monto}
                </p>
                <p className="text-gray-300 mt-2">
                  <strong className="text-purple-400">Estado:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      factura.estado === "Aprobada"
                        ? "text-green-400"
                        : factura.estado === "Pendiente"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {factura.estado}
                  </span>
                </p>
                <button
                  onClick={() => enviarSF(factura)}
                  className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Aprobar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

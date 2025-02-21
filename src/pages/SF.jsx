import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SF() {
  const [cuentasPorCobrar, setCuentasPorCobrar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las cuentas por cobrar
  const obtenerCuentasPorCobrar = async () => {
    try {
      const response = await axios.get("http://localhost:7000/cuentas");
      setCuentasPorCobrar(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setError("Error al obtener las cuentas por cobrar");
      setLoading(false);
      console.error(error);
    }
  };

  // Llama a la función al cargar el componente
  useEffect(() => {
    obtenerCuentasPorCobrar();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">
        Cuentas por Cobrar
      </h1>
      {cuentasPorCobrar.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cuentasPorCobrar.map((cuenta) => (
            <li
              key={cuenta.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700"
            >
              <p className="text-gray-300">
                <strong className="text-purple-400">Cliente:</strong>{" "}
                {cuenta.cliente}
              </p>
              <p className="text-gray-300 mt-2">
                <strong className="text-purple-400">Total:</strong>{" "}
                {cuenta.total}
              </p>
              <p className="text-gray-300 mt-2">
                <strong className="text-purple-400">Estado:</strong>{" "}
                <span
                  className={`font-semibold ${
                    cuenta.estado === "Pagada"
                      ? "text-green-400"
                      : cuenta.estado === "Pendiente"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {cuenta.estado}
                </span>
              </p>
              <Link
                to={`/cuenta/${cuenta.id}`}
                className="mt-4 inline-block w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
              >
                Ver cuenta
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">
          No hay cuentas por cobrar registradas.
        </p>
      )}
    </div>
  );
}

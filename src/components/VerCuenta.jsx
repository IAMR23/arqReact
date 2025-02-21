import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VerCuenta() {
  const [cuenta, setCuentasPorCobrar] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  // Función para obtener las cuentas por cobrar
  const obtenerCuentasPorCobrar = async () => {
    if (!id) {
      setError("No se proporcionó un ID válido.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:7000/cuenta/${id}`);
      setCuentasPorCobrar(response.data);
    } catch (error) {
      setError("Error al obtener las cuentas por cobrar");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Paypal = async () => {
    try {
      const data = {
        cliente: cuenta.cliente,
        total: cuenta.total,
        metodoPago: "Pagado con PayPal",
        estado: "Finalizado",
      };

      const response = await axios.post("http://localhost:7000/paypal", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCuentasPorCobrar(response.data);
    } catch (error) {
      setError("Error al procesar el pago con PayPal");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Mastercard = async () => {
    try {
      const data = {
        cliente: cuenta.cliente,
        total: cuenta.total,
        metodoPago: "Pagado con Mastercard",
        estado: "Finalizado",
      };

      const response = await axios.post(
        "http://localhost:7000/mastercard",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCuentasPorCobrar(response.data);
    } catch (error) {
      setError("Error al procesar el pago con Mastercard");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Llama a la función al cargar el componente y cuando cambie el ID
  useEffect(() => {
    obtenerCuentasPorCobrar();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">
        Cuentas por Cobrar
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li
          key={cuenta.id}
          className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-700"
        >
          <p className="text-gray-300">
            <strong className="text-purple-400">Cliente:</strong>{" "}
            {cuenta.cliente}
          </p>
          <p className="text-gray-300 mt-2">
            <strong className="text-purple-400">Total:</strong> {cuenta.total}
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
        </li>
      </ul>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => Paypal(cuenta)}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          PayPal
        </button>
        <button
          onClick={() => Mastercard(cuenta)}
          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Mastercard
        </button>
      </div>
    </div>
  );
}

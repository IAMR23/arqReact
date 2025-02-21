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
        estado: "Pagado con PayPal",
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
        estado: "Pagado con Mastercard",
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
    <div>
      <h1>Cuentas por Cobrar</h1>
      <ul>
        <li key={cuenta.id}>
          <strong>Cliente:</strong> {cuenta.cliente} <br />
          <strong>Total:</strong> {cuenta.total} <br />
          <strong>Estado:</strong> {cuenta.estado}
        </li>
      </ul>

      <div>
        <button onClick={() => Paypal(cuenta)}>PayPal</button>
        <button onClick={() => Mastercard(cuenta)}>Mastercard</button>
      </div>
    </div>
  );
}

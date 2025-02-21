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
    <div>
      <h1>Cuentas por Cobrar</h1>
      {cuentasPorCobrar.length > 0 ? (
        <ul>
          {cuentasPorCobrar.map((cuenta, index) => (
            <li key={cuenta.id}>
              <strong>Cliente:</strong> {cuenta.cliente} <br />
              <strong>Total:</strong> {cuenta.total} <br />
              <strong>Estado:</strong> {cuenta.estado}
              <Link to={`/cuenta/${cuenta.id}`}>Ver cuenta</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay cuentas por cobrar registradas.</p>
      )}
    </div>
  );
}

// src/services/api.js
import axios from "axios";

// Configuración base de Axios
const api = axios.create({
  baseURL: "https://fakestoreapi.com", // URL raíz de la API
  timeout: 5000, // Tiempo máximo de espera (opcional)
});

export default api;

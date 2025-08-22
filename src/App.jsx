// src/App.jsx
import './styles/App.css'


import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppRouter />
    </div>
  );
}

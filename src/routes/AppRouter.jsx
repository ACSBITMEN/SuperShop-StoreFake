import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import LoginPage from "../pages/LoginPage";

export default function AppRouter() {
  return (
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/product/:id" element={<MainLayout><ProductDetailPage /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
  );
}

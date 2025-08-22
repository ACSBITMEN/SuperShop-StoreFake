// src/components/layouts/MainLayout.jsx
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-grow pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

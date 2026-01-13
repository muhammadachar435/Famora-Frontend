import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "../context/AuthContext";
import WatsappChat from "../components/WhatsAppButton";
import { CartProvider } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: {
    default: "Famora | Online Clothes Collection ",
    template: "%s | StylePeak",
  },
  description:
    "Discover premium fashion at StylePeak — shop the latest styles for men, women, kids, and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* --- Global ToastContainer --- */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" // optional: switch to "dark" if needed
        />

        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {/* AuthProvider  */}
          <AuthProvider>
            {/* Cart Provider */}
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <WatsappChat />
            </CartProvider>
            <div id="model-root"></div> {/* Model ID*/}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

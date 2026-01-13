/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Category Model
export default function CategoryModel({ children, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    const element = document.getElementById("model-root");
    setPortalElement(element);
    setMounted(true);
  }, []);

  if (!mounted || !portalElement || !isOpen) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40" />

      {/* Modal Box */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 dark:bg-[#1f1f1f]/50 rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-auto p-6 lg:p-2">
        {children}
      </div>
    </>,
    portalElement
  );
}

"use client";

// imports
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Model Props Type
type ModelProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

// Model Component
export default function Model({ children, isOpen, onClose }: ModelProps) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById("model-root");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalElement(element);
    setMounted(true);
  }, []);

  if (!mounted || !portalElement || !isOpen) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 " onClick={onClose} />

      {/* Modal Content with Blue Scrollbar */}
      <div
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#222222] p-6 rounded-xl shadow-lg w-full max-w-76 sm:max-w-xl xl:max-w-4xl h-full max-h-10/12 lg:max-h-152 overflow-auto"
        style={{ scrollbarColor: "#3b82f6 #e0e7ff", scrollbarWidth: "thin" }}
      >
        {children}
      </div>
    </>,
    portalElement
  );
}

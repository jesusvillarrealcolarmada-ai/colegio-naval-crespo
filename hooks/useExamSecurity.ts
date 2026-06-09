"use client";

import { useEffect } from "react";

export function useExamSecurity(
  onFraudDetected: (reason: string) => void
) {
  useEffect(() => {

    const trigger = (reason: string) => {
      onFraudDetected(reason);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        trigger("Cambio de pestaña o minimización del examen");
      }
    };

    const handleBlur = () => {
      trigger("Salida de la ventana del examen");
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      trigger("Intento de copiar contenido");
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      trigger("Intento de pegar contenido");
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      trigger("Intento de cortar contenido");
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      trigger("Intento de clic derecho");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (e.ctrlKey && key === "c") {
        e.preventDefault();
        trigger("Ctrl + C detectado");
      }

      if (e.ctrlKey && key === "v") {
        e.preventDefault();
        trigger("Ctrl + V detectado");
      }

      if (e.ctrlKey && key === "x") {
        e.preventDefault();
        trigger("Ctrl + X detectado");
      }

      if (e.key === "F12") {
        e.preventDefault();
        trigger("Intento de abrir herramientas de desarrollador");
      }

      if (e.ctrlKey && e.shiftKey && key === "i") {
        e.preventDefault();
        trigger("Intento de abrir DevTools (Ctrl+Shift+I)");
      }

      if (e.ctrlKey && e.shiftKey && key === "j") {
        e.preventDefault();
        trigger("Intento de consola (Ctrl+Shift+J)");
      }

      if (e.ctrlKey && key === "u") {
        e.preventDefault();
        trigger("Intento de ver código fuente");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("cut", handleCut);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [onFraudDetected]);
}
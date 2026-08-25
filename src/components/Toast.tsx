import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
  onDone: () => void;
}

export default function Toast({ message, visible, onDone }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        setTimeout(onDone, 300);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [visible, onDone]);

  if (!visible && !show) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl"
      style={{
        background: "rgba(37, 27, 50, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(126, 240, 197, 0.3)",
        boxShadow: "0 8px 40px rgba(126,240,197,0.15)",
        animation: show ? "fade-in-up 0.35s ease-out forwards" : "fade-out-down 0.3s ease-in forwards",
        minWidth: 260,
      }}
      role="alert"
      aria-live="polite"
    >
      <CheckCircle2 size={18} style={{ color: "#7EF0C5", flexShrink: 0 }} />
      <p className="text-sm font-medium" style={{ color: "#FFF7E8" }}>
        {message}
      </p>
    </div>
  );
}

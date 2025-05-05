
import React from "react";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex flex-col gap-2">
      {toasts.map(({ id, title, description, variant = "default" }) => (
        <div
          key={id}
          className={`rounded-md p-4 shadow-md ${
            variant === "destructive" 
              ? "bg-red-600 text-white" 
              : "bg-white text-black border"
          }`}
        >
          {title && <p className="font-medium">{title}</p>}
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
      ))}
    </div>
  );
}

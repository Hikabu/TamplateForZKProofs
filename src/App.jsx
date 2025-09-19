// App.jsx
import React, { useEffect, useRef } from "react";
import { initJellyfish } from "./scripts/jellyfish";
import ProveItCarousel from "./components/ProveItCarousel";

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initJellyfish(canvas, ctx);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <ProveItCarousel />
      </div>
    </div>
  );
}

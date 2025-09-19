import React, { useState } from "react";
import { motion } from "framer-motion";
import ProofDemo from "./ProofDemo";

const windows = [
  {
    id: 1,
    content: "possibilities",
    extra: (
      <select className="p-2 text-black rounded text-left">
        <option>Prove your age</option>
        <option>Prove your work</option>
        <option>Prove that you are a parent</option>
      </select>
    ),
  },
  {
    id: 2,
    content: "Circuit Inputs",
    extra: <ProofDemo />,
  },
  {
    id: 3,
    content: "Share your result",
    extra: (
      <div className="mt-4">
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-500 transition">
          Receive the certificate
        </button>
      </div>
    ),
  },
];

export default function ProveItCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % windows.length);
  const prev = () => setIndex((prev) => (prev - 1 + windows.length) % windows.length);

  return (
    <div className="relative flex w-full h-full items-center justify-center">
      {windows.map((win, i) => {
        const pos = (i - index + windows.length) % windows.length;

        let x = 0;
        if (pos === 1) x = 400;
        if (pos === windows.length - 1) x = -400;

        const isCenter = pos === 0;

        return (
          <motion.div
            key={win.id}
            animate={{
              x,
              scale: isCenter ? 1 : 0.8,
              opacity: isCenter ? 1 : 0.5,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-10 text-center ${
              isCenter ? "w-5/7 z-20" : "w-4/7 z-10"
            }`}
            style={{ maxWidth: "600px" }}
          >
            <h1 className="text-2xl font-bold text-white mb-6">{win.content}</h1>

            <motion.div
              animate={{
                height: isCenter ? "auto" : 0,
                opacity: isCenter ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {win.extra}
              {isCenter && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={prev}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={next}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-500 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const Index = () => {
  return (
    <div>
      <App />
    </div>
  );
};

createRoot(document.getElementById("root")).render(<Index />);

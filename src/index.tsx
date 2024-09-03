import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { NES } from "@/components/NES";

import "./index.css";

createRoot(document.body).render(
  <StrictMode>
    <NES />
  </StrictMode>
);

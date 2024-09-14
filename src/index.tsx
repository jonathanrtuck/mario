import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Console } from "@/components/Console";

import "./index.css";

createRoot(document.body).render(
  <StrictMode>
    <Console />
  </StrictMode>
);

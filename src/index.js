import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Grommet } from "grommet";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Grommet>
      <App />
    </Grommet>
  </StrictMode>
);

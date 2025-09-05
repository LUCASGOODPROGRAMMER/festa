import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";

// Pages
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import CreateParty from "./routes/CreateParty.jsx";
import Party from "./routes/Party.jsx";
import EditParty from "./routes/EditParty.jsx";

// Styles
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "/party/new", element: <CreateParty /> },
        { path: "/party/:id", element: <Party /> },
        { path: "/party/edit/:id", element: <EditParty /> },
      ],
    },
  ],
  { basename: "/party_time/" }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

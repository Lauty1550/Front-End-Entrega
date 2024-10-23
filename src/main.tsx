import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";

/* const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {" "}
    <Auth0Provider
      domain="dev-cmlykyxq5ctucxiq.us.auth0.com"
      clientId="gJUnAJushoaMqN7cDU14Df5CzzUeJXCp"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/home",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

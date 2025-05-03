import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "./contexts/ApiContext";
import { KosarProvider } from "./contexts/KosarContext";
import { AnalitikaProvider } from "./contexts/AnalitikaContext";
import { AdminProvider } from "./contexts/AdminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <KosarProvider>
      <AuthProvider>
        <ApiProvider>
          <AdminProvider>
            <AnalitikaProvider>
              
                <App />
              
            </AnalitikaProvider>
          </AdminProvider>
        </ApiProvider>
      </AuthProvider>
      </KosarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

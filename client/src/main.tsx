import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./contexts/User.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </UserProvider>
    </React.StrictMode>
);

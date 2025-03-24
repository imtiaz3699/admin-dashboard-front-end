import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { UserProvider } from "./context/userContext.tsx";
import { ApiProvider } from "./context/apiFuncContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      <ApiProvider>
        <ThemeProvider>
          <AppWrapper>
            <App />
          </AppWrapper>
        </ThemeProvider>
      </ApiProvider>
    </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

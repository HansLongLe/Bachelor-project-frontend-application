import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/app/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { initKFL, ThemeProvider } from "@kamstrup/kfl";
import { initializeApplicationInsights } from "@kamstrup/kamstrup-logging";
import { AuthProvider } from "@remotes/coreAuth/auth";
import { AuthenticationProvider } from "./contexts/authenticationContext";
import { TranslationsProvider } from "./contexts/translationsContext";

const aiKey = process.env.REACT_APP_AI_IKEY || "";
const applicationVersion = process.env.REACT_APP_VERSION;

initializeApplicationInsights({
  config: { instrumentationKey: aiKey },
  applicationName: "Support landing page",
  applicationVersion
});

const config = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    redirectUri: `${process.env.REACT_APP_REDIRECT_URI}` || "",
    authority: process.env.REACT_APP_AUTHORITY || "",
    knownAuthorities: [process.env.REACT_APP_AUTHORITY || ""]
  },
  scopes: [process.env.REACT_APP_ACCESS_TOKEN_SCOPE || ""]
};

initKFL();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvider config={config}>
        <AuthenticationProvider>
          <TranslationsProvider>
            <App />
          </TranslationsProvider>
        </AuthenticationProvider>
      </AuthProvider>
    </ThemeProvider>
  </Provider>
);

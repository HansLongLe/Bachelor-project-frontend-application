import { render, screen } from "@testing-library/react";
import App from "./App";
import { LayoutProvider } from "@kamstrup/kfl";
import { startConnection } from "../../services/signalRService";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { TranslationsProvider } from "../../contexts/translationsContext";

jest.mock("../../services/signalRService", () => ({
  createHubConnection: jest.fn(),
  startConnection: jest.fn(),
  addMessageReceivedListener: jest.fn()
}));

jest.mock("@remotes/coreAuth/auth", () => ({ useAuth: jest.fn() }), { virtual: true });

const renderApp = () => (
  <LayoutProvider>
    <Provider store={store}>
      <TranslationsProvider>
        <App />
      </TranslationsProvider>
    </Provider>
  </LayoutProvider>
);

describe("App component", () => {
  test("renders without errors", () => {
    render(renderApp());
  });

  test("renders top bar with correct content", () => {
    render(renderApp());

    expect(screen.getByText(/Support landing page/i)).toBeInTheDocument();
  });

  test("calls startConnection on mount", () => {
    render(renderApp());

    expect(startConnection).toHaveBeenCalledTimes(1);
  });
});

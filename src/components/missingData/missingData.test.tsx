import React from "react";
import { render, screen } from "@testing-library/react";
import MissingData from "./missingData";
import { TranslationsProvider } from "../../contexts/translationsContext";

const renderMissingData = () => (
  <TranslationsProvider>
    <MissingData />
  </TranslationsProvider>
);

describe("MissingData component", () => {
  test("renders without errors", () => {
    render(renderMissingData());
  });

  test('displays "No data has been found"', () => {
    render(renderMissingData());
    const textElement = screen.getByText(/No data has been found/i);
    expect(textElement).toBeInTheDocument();
  });
});

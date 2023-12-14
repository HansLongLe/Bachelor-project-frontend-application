import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Tile from "./tile";
import { Colors } from "@kamstrup/kfl";
import { rgb2hex } from "../../utils/convertHEXAndRGB";
import { TranslationsProvider } from "../../contexts/translationsContext";

const renderTiles = () => (
  <TranslationsProvider>
    <Tile tileHeader="Header" tileSubhHeader="Subheader" tooltipText="Tooltip text" />
  </TranslationsProvider>
);

describe("Tile component", () => {
  test("renders without errors", () => {
    render(renderTiles());
  });

  test("displays header and subheader", () => {
    render(renderTiles());

    const header = screen.getByTitle(/Header/i);
    const subHeader = screen.getByText(/Subheader/i);

    expect(header).toBeInTheDocument();
    expect(subHeader).toBeInTheDocument();
  });

  test("toggles draggable state on pin button click", () => {
    render(renderTiles());
    const pinButton = screen.getByTestId("pin-button");

    fireEvent.click(pinButton);

    expect(rgb2hex(getComputedStyle(pinButton).backgroundColor)).toBe(
      Colors.TEAL_75.toLocaleUpperCase()
    );

    fireEvent.click(pinButton);

    expect(rgb2hex(getComputedStyle(pinButton).backgroundColor)).toBe(
      Colors.GREY_12.toLocaleUpperCase()
    );
  });

  test("toggles resizable state on resize button click", () => {
    render(renderTiles());
    const resizeButton = screen.getByTestId("resize-button");

    fireEvent.click(resizeButton);

    expect(rgb2hex(getComputedStyle(resizeButton).backgroundColor)).toBe(
      Colors.TEAL_75.toLocaleUpperCase()
    );

    fireEvent.click(resizeButton);

    expect(rgb2hex(getComputedStyle(resizeButton).backgroundColor)).toBe(
      Colors.GREY_12.toLocaleUpperCase()
    );
  });

  test("Shows tooltip on hover", () => {
    render(renderTiles());
    const element = screen.getByTestId(/card-icon-tooltip/i);

    fireEvent.mouseOver(element);

    expect(screen.getByLabelText(/Tooltip text/i)).toBeInTheDocument();
  });
});

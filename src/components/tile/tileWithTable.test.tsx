import { initKFL } from "@kamstrup/kfl";
import { TranslationsProvider } from "../../contexts/translationsContext";
import TileWithTable from "./tileWithTable";
import { render, screen } from "@testing-library/react";

describe("TileWithTable component", () => {
  beforeAll(() => {
    initKFL();
  });

  test("renders TileWithTable component with table data", () => {
    const tableColumn = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", width: 150 }
    ];

    const tableData = [
      { RowId: 1, name: "John Doe" },
      { RowId: 2, name: "Jane Doe" }
    ];

    render(
      <TranslationsProvider>
        <TileWithTable
          tileHeader="Table Header"
          tileSubheader="Table Subheader"
          tooltipText="Tooltip Text"
          tableColumn={tableColumn}
          tableData={tableData}
          dataReceived={true}
        />
      </TranslationsProvider>
    );

    expect(screen.getByText(/Table Header/i)).toBeInTheDocument();

    expect(screen.getByText(/Table Subheader/i)).toBeInTheDocument();

    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  test("renders TileWithTable component with table data and overview", () => {
    const tableColumn = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", width: 150 }
    ];

    const tableData = [
      { RowId: 1, name: "John Doe" },
      { RowId: 2, name: "Jane Doe" }
    ];

    render(
      <TranslationsProvider>
        <TileWithTable
          tileHeader="Table Header"
          tileSubheader="Table Subheader"
          overview={<div>Overview</div>}
          tooltipText="Tooltip Text"
          tableColumn={tableColumn}
          tableData={tableData}
          dataReceived={true}
        />
      </TranslationsProvider>
    );

    expect(screen.getByText(/Table Header/i)).toBeInTheDocument();

    expect(screen.getByText(/Table Subheader/i)).toBeInTheDocument();

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });
});

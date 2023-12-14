import "./style.scss";
import { Colors, DataGridPro, GridColDef, GridSortModel, Skeleton } from "@kamstrup/kfl";
import Tile from "./tile";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Props = {
  tileHeader: string | JSX.Element;
  tileSubheader: string | JSX.Element;
  tooltipText: string | JSX.Element;
  tableColumn: GridColDef[];
  tableData?: any[];
  sortModel?: GridSortModel;
  overview?: JSX.Element;
  isLoading?: boolean;
  dataReceived?: boolean;
  dataLastReceived?: Date;
  fetchData?: () => void;
};

export type TileWithTableMethods = {
  changeTableHeight: () => void;
};

const TileWithTable = forwardRef<TileWithTableMethods, Props>((props, ref) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [tableHeight, setTableHeight] = useState<number>();
  const [sortModel, setSortModel] = useState<GridSortModel | undefined>(props.sortModel);

  useImperativeHandle(
    ref,
    () => {
      return {
        changeTableHeight
      };
    },
    []
  );

  useEffect(() => {
    changeTableHeight();
  }, [props.tableData]);

  useEffect(() => {
    window.addEventListener("resize", changeTableHeight);
    changeTableHeight();
    return () => window.removeEventListener("resize", changeTableHeight);
  }, []);

  const changeTableHeight = () => {
    if (divRef.current) {
      const card = divRef.current.parentElement?.parentElement;
      if (card) {
        let height = card.clientHeight;
        height = height < 500 ? height / 2 : height < 700 ? height / 1.7 : height / 1.5;
        setTableHeight(height);
      }
    }
  };

  return (
    <Tile
      tileHeader={props.tileHeader}
      tileSubhHeader={props.tileSubheader}
      tooltipText={props.tooltipText}
      dataLastReceived={props.dataLastReceived}
      isLoading={props.isLoading}
      dataReceived={props.dataReceived}
      fetchData={props.fetchData}
      customSkeleton={
        <>
          <Skeleton width="100%" height="20%" sx={{ marginBottom: "-25px" }} />
          <Skeleton height={props.overview ? "80%" : "100%"} />
        </>
      }
    >
      {props.overview ? <section className="table-overview">{props.overview}</section> : <></>}
      <div ref={divRef}>
        <DataGridPro
          sx={{
            minHeight: "200px",
            height: `${
              tableHeight ? (props.overview ? tableHeight : tableHeight * 1.3) : undefined
            }px`,
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
              outline: "none !important"
            },
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus": {
              outline: "none !important"
            },
            mx: "16px",
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              width: "8px"
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
              background: Colors.GREY_25,
              borderRadius: "8px"
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
              backgroundColor: Colors.TEAL_50,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: Colors.TEAL_75
              }
            }
          }}
          columns={props.tableColumn}
          getRowId={(row) => row.RowId}
          rows={props.tableData ? props.tableData : []}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          hideFooterSelectedRowCount
          pageSizeOptions={[100]}
          disableRowSelectionOnClick
          pagination
        />
      </div>
    </Tile>
  );
});

export default TileWithTable;

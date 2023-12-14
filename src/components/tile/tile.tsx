import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Colors,
  IconButton,
  InfoIcon,
  ReverseIcon,
  Skeleton,
  Tooltip,
  Typography
} from "@kamstrup/kfl";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import PinIcon from "../../icons/pinIcon";
import ResizeIcon from "../../icons/resizeIcon";
import { TileActions } from "../../definitions/enums";
import { useTranslations } from "../../hooks/useTranslation";
import MissingData from "../missingData/missingData";

type Props = {
  tileHeader: string | JSX.Element;
  tileSubhHeader: string | JSX.Element;
  tooltipText: string | JSX.Element;
  isLoading?: boolean;
  dataReceived?: boolean;
  customSkeleton?: JSX.Element;
  dataLastReceived?: Date;
  fetchData?: () => void;
};

const Tile = (props: PropsWithChildren & Props) => {
  const translations = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [isResizable, setIsResizable] = useState<boolean>(false);
  const [grabbing, setIsGrabbing] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      const resizeHandle = ref.current.nextElementSibling as HTMLSpanElement;
      if (resizeHandle) {
        resizeHandle.style.visibility = isResizable ? "visible" : "hidden";
      }
    }
  }, [isResizable]);

  const handleOnClick = (actionName: TileActions) => {
    if (actionName === TileActions.move) {
      setIsDraggable(!isDraggable);
    } else {
      setIsResizable(!isResizable);
    }
  };

  const handleMouseDown = () => {
    setIsGrabbing(true);
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  return (
    <div
      ref={ref}
      style={{ height: "100%" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: Colors.WHITE,
          height: "100%",
          ...(isDraggable
            ? {
                ":-ms-user-select": "none",
                userSelect: "none",
                cursor: grabbing ? "grabbing" : "grab"
              }
            : {})
        }}
        className={isDraggable ? "drag-handle" : ""}
      >
        <CardHeader
          title={
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: Colors.BLACK,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                  title={props.tileHeader.toString()}
                  variant="h2"
                >
                  {props.tileHeader}
                </Typography>
                <Box sx={{ marginLeft: "8px", marginRight: "88px" }}>
                  <Tooltip title={props.tooltipText}>
                    <InfoIcon
                      data-testid="card-icon-tooltip"
                      sx={{ fontSize: "16px" }}
                      color="action"
                    />
                  </Tooltip>
                </Box>
              </Box>
              <div className="tile-controls">
                <IconButton
                  data-testid="pin-button"
                  onClick={() => handleOnClick(TileActions.move)}
                  sx={{
                    backgroundColor: isDraggable ? Colors.TEAL_50 : "transparent",
                    marginRight: "8px",
                    "&:hover": {
                      backgroundColor: isDraggable ? Colors.TEAL_75 : Colors.GREY_12
                    }
                  }}
                >
                  <PinIcon color={isDraggable ? Colors.WHITE : Colors.BLACK} />
                </IconButton>
                <IconButton
                  data-testid="resize-button"
                  onClick={() => handleOnClick(TileActions.resize)}
                  sx={{
                    backgroundColor: isResizable ? Colors.TEAL_50 : "transparent",
                    "&:hover": {
                      backgroundColor: isResizable ? Colors.TEAL_75 : Colors.GREY_12
                    }
                  }}
                >
                  <ResizeIcon color={isResizable ? Colors.WHITE : Colors.BLACK} />
                </IconButton>
              </div>
            </Box>
          }
          subheader={props.tileSubhHeader}
          sx={{ "& .MuiCardHeader-content": { width: "100%" } }}
        />
        <CardContent
          sx={{
            overflowY: "auto",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-track": { background: Colors.GREY_25, borderRadius: "8px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: Colors.TEAL_50,
              borderRadius: "8px",
              "&:hover": { backgroundColor: Colors.TEAL_75 }
            }
          }}
        >
          {!props.isLoading ? (
            props.children
          ) : props.dataReceived ? (
            <MissingData />
          ) : props.customSkeleton ? (
            props.customSkeleton
          ) : (
            <Skeleton height="100%" />
          )}
        </CardContent>
        <CardActions sx={{ padding: "16px" }}>
          <Tooltip title={translations.update_data}>
            <IconButton sx={{ marginRight: "8px", borderRadius: "16px" }} onClick={props.fetchData}>
              <ReverseIcon sx={{ fontSize: "14px" }} />
            </IconButton>
          </Tooltip>
          {props.dataLastReceived ? (
            <Typography variant="body2" sx={{ color: Colors.GREY_25 }}>
              {`${translations.data_last_updated}: ${props.dataLastReceived.toLocaleString()}`}
            </Typography>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default Tile;

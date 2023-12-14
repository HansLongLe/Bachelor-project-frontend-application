import { Colors } from "@kamstrup/kfl";
import { FC } from "react";

type Props = {
  color?: string;
};

const ResizeIcon: FC<Props> = (props) => {
  return (
    <svg height="32" viewBox="0 0 512 512" width="64" xmlns="http://www.w3.org/2000/svg">
      <title />
      <polyline
        points="304 96 416 96 416 208"
        style={{
          fill: "none",
          stroke: `${props.color ? props.color : Colors.BLACK}`,
          strokeLinecap: "square",
          strokeMiterlimit: 10,
          strokeWidth: "32px"
        }}
      />
      <line
        style={{
          fill: "none",
          stroke: `${props.color ? props.color : Colors.BLACK}`,
          strokeLinecap: "square",
          strokeMiterlimit: 10,
          strokeWidth: "32px"
        }}
        x1="405.77"
        x2="111.98"
        y1="106.2"
        y2="400.02"
      />
      <polyline
        points="208 416 96 416 96 304"
        style={{
          fill: "none",
          stroke: `${props.color ? props.color : Colors.BLACK}`,
          strokeLinecap: "square",
          strokeMiterlimit: 10,
          strokeWidth: "32px"
        }}
      />
    </svg>
  );
};

export default ResizeIcon;

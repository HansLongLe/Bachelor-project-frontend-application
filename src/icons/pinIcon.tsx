import { Colors } from "@kamstrup/kfl";
import { FC } from "react";

type Props = {
  color?: string;
};

const PinIcon: FC<Props> = (props) => {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="256" width="256" />
      <line
        fill="none"
        stroke={props.color ? props.color : Colors.BLACK}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="88"
        x2="48"
        y1="168"
        y2="208"
      />
      <path
        d="M154.3,29.7,92,92S64.3,78.1,34.6,102.1A8,8,0,0,0,34,114L141.8,221.8a8,8,0,0,0,12.1-.8c8.4-11.1,21.6-34.1,10.1-57l62.3-62.3a8,8,0,0,0,0-11.4L165.7,29.7A8,8,0,0,0,154.3,29.7Z"
        fill="none"
        stroke={props.color ? props.color : Colors.BLACK}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};

export default PinIcon;

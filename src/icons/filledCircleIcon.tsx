import { FC } from "react";

type Props = {
  color?: string;
  fontSize?: number;
};

const FilledCircleIcon: FC<Props> = (props) => {
  return (
    <svg height={props.fontSize || "16"} width={props.fontSize || "16"}>
      <circle
        cx={(props.fontSize && props.fontSize / 2) || "8"}
        cy={(props.fontSize && props.fontSize / 2) || "8"}
        r={(props.fontSize && props.fontSize / 2) || "8"}
        fill={props.color || "black"}
      />
    </svg>
  );
};

export default FilledCircleIcon;

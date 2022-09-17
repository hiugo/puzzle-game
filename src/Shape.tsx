import { memo } from "react";
import Svg, { ClipPath, Defs, Path, Use } from "react-native-svg";

import { COLORS, SVG_BOX_SIZE, SVG_SIZE } from "./Constants";

type Props = {
  type: "piece" | "spot";
  shape: string;
  piece: {
    x: number;
    y: number;
    path: string;
  };
};

function Shape({ type, shape, piece }: Props) {
  const pathX = -(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.x;
  const pathY = -(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.y;

  const isPiece = type === "piece";

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SVG_BOX_SIZE} ${SVG_BOX_SIZE}`}
    >
      <Defs>
        <ClipPath id="shape">
          <Path d={shape} x={pathX} y={pathY} />
        </ClipPath>
        <Path id="puzzle" d={piece.path} />
      </Defs>
      {isPiece && (
        <Use href="#puzzle" fill={isPiece ? COLORS.white : COLORS.lightGrey} />
      )}
      <Use
        href="#puzzle"
        fill={isPiece ? COLORS.primary : COLORS.lightGrey}
        clipPath="url(#shape)"
      />
      <Use
        href="#puzzle"
        stroke={isPiece ? COLORS.black : COLORS.darkGrey}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default memo(Shape);

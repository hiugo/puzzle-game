import { StyleSheet, View } from "react-native";
import Svg, { ClipPath, Defs, Path, Use } from "react-native-svg";

import {
  PUZZLE_PIECES,
  PUZZLE_PIECE_BOX_SIZE,
  PUZZLE_PIECE_SIZE,
  SVG_BOX_SIZE,
  SVG_SIZE,
} from "./Constants";

type Props = {
  index: number;
  shape: string;
};

export default function PuzzleSpot({ index, shape }: Props) {
  const piece = PUZZLE_PIECES[index];

  const x = (PUZZLE_PIECE_SIZE / 2) * piece.x;
  const y = (PUZZLE_PIECE_SIZE / 2) * piece.y;

  const pathX = -(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.x;
  const pathY = -(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.y;

  return (
    <View
      style={[
        styles.container,
        { transform: [{ translateX: x }, { translateY: y }] },
      ]}
    >
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
        <Use href="#puzzle" fill="#e2e8f0" clipPath="url(#shape)" />
        <Use
          href="#puzzle"
          stroke="#cbd5e1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: PUZZLE_PIECE_BOX_SIZE,
    height: PUZZLE_PIECE_BOX_SIZE,
    zIndex: -1,
  },
});

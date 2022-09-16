import { StyleSheet, View } from "react-native";

import {
  PUZZLE_PIECES,
  PUZZLE_PIECE_BOX_SIZE,
  PUZZLE_PIECE_SIZE,
} from "./Constants";

import Shape from "./Shape";

type Props = {
  index: number;
  shape: string;
};

function PuzzleSpot({ index, shape }: Props) {
  const piece = PUZZLE_PIECES[index];

  const x = (PUZZLE_PIECE_SIZE / 2) * piece.x;
  const y = (PUZZLE_PIECE_SIZE / 2) * piece.y;

  return (
    <View
      style={[
        styles.container,
        { transform: [{ translateX: x }, { translateY: y }] },
      ]}
    >
      <Shape type="spot" shape={shape} piece={piece} />
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

export default PuzzleSpot;

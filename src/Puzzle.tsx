import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { PIECES_DISTANCE, PUZZLE_PIECES, SHAPES, shuffle } from "./Constants";
import PuzzlePiece from "./PuzzlePiece";
import PuzzleSpot from "./PuzzleSpot";

export default function Puzzle() {
  const [currentShape, setCurrentShape] = useState(0);
  const [shuffledPieces, setShuffledPieces] = useState(() =>
    shuffle([...Array(PUZZLE_PIECES.length).keys()])
  );

  const shape = SHAPES[currentShape];

  const scale = useSharedValue(0);
  const correctPieces = useSharedValue(0);

  const handleReset = useCallback(() => {
    setCurrentShape((prev) => (prev + 1 === SHAPES.length ? 0 : prev + 1));
    setShuffledPieces(() => shuffle([...Array(PUZZLE_PIECES.length).keys()]));
    correctPieces.value = 0;
  }, []);

  useEffect(() => {
    scale.value = withSpring(1);
  }, [shuffledPieces]);

  useAnimatedReaction(
    () => correctPieces.value >= 4,
    (isDone) => {
      if (isDone) {
        scale.value = withDelay(
          1000,
          withTiming(0, {}, (isFinished) => {
            if (isFinished) runOnJS(handleReset)();
          })
        );
      }
    }
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: PIECES_DISTANCE / 2 }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {PUZZLE_PIECES.map((_, i) => (
        <PuzzleSpot key={`spot-${i}`} index={i} shape={shape} />
      ))}
      {PUZZLE_PIECES.map((_, i) => (
        <PuzzlePiece
          key={`spot-${i}`}
          index={i}
          shape={shape}
          shuffledPieces={shuffledPieces}
          correctPieces={correctPieces}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

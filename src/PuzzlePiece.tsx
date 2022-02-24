import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { ClipPath, Defs, Path, Use } from "react-native-svg";

import {
  getRandomRotation,
  PIECES_DISTANCE,
  PIECE_SCALE,
  PUZZLE_PIECES,
  PUZZLE_PIECE_BOX_SIZE,
  PUZZLE_PIECE_SIZE,
  SVG_BOX_SIZE,
  SVG_SIZE,
} from "./Constants";

type Props = {
  index: number;
  shape: string;
  shuffledPieces: number[];
  correctPieces: SharedValue<number>;
};

export default function PuzzlePiece({
  index,
  shape,
  shuffledPieces,
  correctPieces,
}: Props) {
  const shuffledIndex = shuffledPieces[index];
  const piece = PUZZLE_PIECES[index];
  const shuffledPiece = PUZZLE_PIECES[shuffledIndex];
  const delay = 1150 + index * 150;
  const randomRotation = getRandomRotation();
  const safeSpacing = PUZZLE_PIECE_SIZE / 2;

  const initialX = (PUZZLE_PIECE_SIZE / 2) * piece.x;
  const initialY = (PUZZLE_PIECE_SIZE / 2) * piece.y;
  const shuffledX = 60 * shuffledPiece.x - PIECES_DISTANCE;
  const shuffledY = 60 * shuffledPiece.y;

  const pathX = -(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.x;
  const pathY = -(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.y;

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const z = useSharedValue(0);
  const isEnabled = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(delay, withSpring(shuffledX));
    translateY.value = withDelay(delay, withSpring(shuffledY));
    scale.value = withDelay(delay, withSpring(PIECE_SCALE));
    rotate.value = withDelay(delay, withSpring(randomRotation));
    isEnabled.value = withDelay(delay, withTiming(1));
  }, [shuffledPieces]);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      if (!isEnabled.value) return;

      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;
      scale.value = withSpring(1);
      rotate.value = withSpring(0);
      z.value = 1;
    },
    onEnd: () => {
      if (!isEnabled.value) return;

      const isCorrect =
        translateX.value >= initialX - safeSpacing &&
        translateX.value <= initialX + safeSpacing &&
        translateY.value <= initialY + safeSpacing &&
        translateY.value >= initialY - safeSpacing;

      translateX.value = withSpring(isCorrect ? initialX : shuffledX);
      translateY.value = withSpring(isCorrect ? initialY : shuffledY);
      scale.value = withSpring(isCorrect ? 1 : PIECE_SCALE);
      rotate.value = withSpring(isCorrect ? 0 : randomRotation);
      z.value = withDelay(500, withTiming(0)); // Delay to wait for animation

      if (isCorrect) {
        isEnabled.value = 0;
        correctPieces.value++;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
    zIndex: z.value,
  }));

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
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
          <Use href="#puzzle" fill="#ffffff" />
          <Use href="#puzzle" fill="#1A91FF" clipPath="url(#shape)" />
          <Use
            href="#puzzle"
            stroke="#1e293b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: PUZZLE_PIECE_BOX_SIZE,
    height: PUZZLE_PIECE_BOX_SIZE,
  },
});

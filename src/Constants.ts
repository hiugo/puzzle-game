// COLORS

export const COLORS = {
  primary: "#1a91ff",
  black: "#1e293b",
  white: "#ffffff",
  lightGrey: "#e2e8f0",
  darkGrey: "#cbd5e1",
};

// SIZES

// Sizes for the svgs (100x100)
export const SVG_BOX_SIZE = 100;
export const SVG_SIZE = 60;
// Sizes to be rendered
export const PUZZLE_PIECE_BOX_SIZE = 150;
export const PUZZLE_PIECE_SIZE = 90;
export const PIECES_DISTANCE = 240;

export const PIECE_SCALE = 0.8;

// PUZZLE PIECES

const PIECE_1 =
  "M40 80H20V40a19.998 19.998 0 0 1 20-20h40v20c5.519 0 10 4.481 10 10s-4.481 10-10 10v20H60c0-5.519-4.481-10-10-10s-10 4.481-10 10Z";
const PIECE_2 =
  "M20 40V20h40a19.998 19.998 0 0 1 20 20v40H60c0 5.519-4.481 10-10 10s-10-4.481-10-10H20V60c5.519 0 10-4.481 10-10s-4.481-10-10-10Z";
const PIECE_3 =
  "M80 60v20H40a19.998 19.998 0 0 1-20-20V20h20c0-5.519 4.481-10 10-10s10 4.481 10 10h20v20c-5.519 0-10 4.481-10 10s4.481 10 10 10Z";
const PIECE_4 =
  "M60 20h20v40a19.998 19.998 0 0 1-20 20H20V60c-5.519 0-10-4.481-10-10s4.481-10 10-10V20h20c0 5.519 4.481 10 10 10s10-4.481 10-10Z";

export const PUZZLE_PIECES = [
  { x: -1, y: -1, path: PIECE_1 },
  { x: 1, y: -1, path: PIECE_2 },
  { x: -1, y: 1, path: PIECE_3 },
  { x: 1, y: 1, path: PIECE_4 },
];

// SHAPES

const CIRCLE_SHAPE =
  "M80 30c-12.033 0-23.078 4.26-31.71 11.352C37.126 50.525 30 64.437 30 80c0 27.596 22.404 50 50 50s50-22.404 50-50-22.404-50-50-50Z";
const SQUARE_SHAPE =
  "M127 37a4 4 0 0 0-4-4H37a4 4 0 0 0-4 4v86a4 4 0 0 0 4 4h86a4 4 0 0 0 4-4V37Z";
const PENTAGON_SHAPE =
  "M81.176 28.865a2.002 2.002 0 0 0-2.352 0L29.172 64.94a2 2 0 0 0-.726 2.236l18.965 58.369a2 2 0 0 0 1.902 1.382h61.374a2 2 0 0 0 1.902-1.382l18.964-58.369a2 2 0 0 0-.726-2.236L81.176 28.865Z";

export const SHAPES = [CIRCLE_SHAPE, SQUARE_SHAPE, PENTAGON_SHAPE];

// FUNCTIONS

export const shuffle = (array: any[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const MAX_ROTATION = 5;

export const getRandomRotation = () => {
  return Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;
};

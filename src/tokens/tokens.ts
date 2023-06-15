const getRem = (size: number) => `${size / 16}rem`;

const skyblues = {
  skyblue_1: "#0079FF",
  skyblue_2: "#8696FE",
};

const whites = {
  white_1: "#ffffff",
};

const greys = {
  grey_1: "#9BABB8",
  grey_2: "#DDE6ED",
};

const reds = {
  red_1: "#DB005B",
};

export const colors = {
  ...skyblues,
  ...whites,
  ...greys,
  ...reds,
};

export const spaces = {
  space_8: getRem(8),
  space_12: getRem(12),
  space_16: getRem(16),
  space_20: getRem(20),
  space_24: getRem(24),
  space_32: getRem(32),
  space_64: getRem(64),
  space_120: getRem(120),
  space_160: getRem(160),
};

export const boxShadows = {
  type_1: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

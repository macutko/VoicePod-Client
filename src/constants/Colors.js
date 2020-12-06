const pallette = {
  red: "#CC0000",
  black: "#002A33",
  blackBRight: "#00596C",
  yellow: "#FFF68F",
  purple: "#A3005A",
  blue: "#3DE8FF",
  brightBlue: "#6EEEFF",
  brightRed: "#FF1A1A",
  brightYellow: "#FFF8AB",
  bright: "#FFF",
  beigh: "#9b9b9b"
};
const palletteRGB = {
  brightBlue: "rgb(110,238,255)",
  brightRed: "rgb(255,26,26)",
};

export const colorScheme = {
  containerColor: pallette.bright,
  text: pallette.black,
  divider: pallette.beigh,
  welcomeScreenText: pallette.black,
  welcomeScreenBackgroundButton: pallette.beigh,
  modalBorderColor: pallette.beigh,
  modalBG: pallette.black,
  FormText: pallette.bright,
  error: pallette.red,
  currentUserInnerCircle: pallette.blue,
  currentUserOuterCircle: palletteRGB.brightBlue,
  targetUserInnerCircle: pallette.red,
  targetUserOuterCircle: palletteRGB.brightRed,
  navigationBG: pallette.blue,
  activeNavigation: pallette.yellow,
  inactiveNavigation: pallette.brightYellow,
};

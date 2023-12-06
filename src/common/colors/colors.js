export const COLOR_PALETTES = {
  palette1: {
    first: "#435572",
    second: "#c1bbbf",
    accent: "#606180",
    white: "#fbfbfb",
    lightGrey: "#f1f5f4",
    darkDarkGreen: "#05663d",
    darkGreen: "#067244",
    green: "#1A4242",
    grey: "#aec1bc",
    darkGrey: "#767777",
    description: "#656678",
    yellow: "#fbbc04",
    red: "#ff4229",
    navigation: "#F9F5EB",
    absent: "#FF4229",
    present: "#067244",
    excused_absence: "#7d7d7d",
    late: "#dab363",
  },
  palette2: {
    first: "#3C7DB3",
    second: "#DCD0DC",
    accent: "#ff4229",
    third: "#A7BEAE",
    white: "#fbfbfb",
    lightGrey: "#f1f5f4",
    darkDarkGreen: "#05663d",
    darkGreen: "#067244",
    green: "#1A4242",
    lightGreen: "#9CC9BF",
    grey: "#aec1bc",
    darkGrey: "#767777",
    description: "#656678",
    yellow: "#fbbc04",
    red: "#ff4229",
    navigation: "#F9F5EB",
    absent: "#FF4229",
    present: "#067244",
    excused_absence: "#7d7d7d",
    late: "#dab363",
  },
  palette3: {
    first: "#1D3066",
    second: "#C4B9F2",
    accent: "#348CA8",
    third: "#A7BEAE",
    white: "#fbfbfb",
    lightGrey: "#f0f4f3",
    darkDarkGreen: "#045a3a",
    darkGreen: "#056d51",
    green: "#184241",
    lightGreen: "#a8d1c5",
    grey: "#acc1bd",
    darkGrey: "#737878",
    description: "#636678",
    yellow: "#fbbf04",
    red: "#ff3f29",
    navigation: "#F8F4EA",
    absent: "#FF4229",
    present: "#067244",
    excused_absence: "#7d7d7d",
    late: "#dab363",
  },
  palette4: {
    first: "#245233",
    second: "#BCE1C8",
    accent: "#40915B",
    third: "#A7BEAE",
    white: "#fbfbfb",
    lightGrey: "#f0f4f3",
    darkDarkGreen: "#045a3a",
    darkGreen: "#056d51",
    green: "#184241",
    lightGreen: "#a8d1c5",
    grey: "#acc1bd",
    darkGrey: "#737878",
    description: "#636678",
    yellow: "#fbbf04",
    red: "#ff3f29",
    navigation: "#F8F4EA",
    absent: "#FF4229",
    present: "#067244",
    excused_absence: "#7d7d7d",
    late: "#dab363",
  },
};

export const DEFAULT_PALETTE = "palette1";
const storedPalette =
  localStorage.getItem("selectedPalette") || DEFAULT_PALETTE;
const storedPersonalizationSettings = localStorage.getItem(
  "personalizationSettings"
);
const storedSettings = storedPersonalizationSettings
  ? JSON.parse(storedPersonalizationSettings)
  : {};

export const COLORS =
  COLOR_PALETTES[storedSettings.selectedPalette || storedPalette];
export const getStatusColor = (status) => {
  const lowerCaseStatus = status.toLowerCase();
  return COLORS[lowerCaseStatus] || COLORS.first;
};

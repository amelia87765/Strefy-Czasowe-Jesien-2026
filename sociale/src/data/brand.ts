export type Season = "summer" | "winter";
export type Format = "post" | "story";
export type ContentType = "artist" | "small" | "large" | "grids";
export type TextAlign = "left" | "center" | "right";
export type TextVAlign = "top" | "center" | "bottom";

export const CLASSICO = '"URW Classico", Palatino, "Palatino Linotype", serif';
export const PALLADIO = '"URW Palladio", Palatino, "Palatino Linotype", serif';
export const HANKEN = '"Hanken Grotesk", "Helvetica Neue", sans-serif';
export const GROTESK =
  '"Akzidenz-Grotesk Next", Grotesk, "Helvetica Neue", sans-serif';

export const seasons: { id: Season; label: string }[] = [
  { id: "summer", label: "SPRING (+1)" },
  { id: "winter", label: "AUTUMN (-1)" },
];

export const formats: {
  id: Format;
  label: string;
  width: number;
  height: number;
}[] = [
  { id: "post", label: "Post", width: 1080, height: 1350 },
  { id: "story", label: "Story", width: 1080, height: 1920 },
];

export const contentTypes: { id: ContentType; label: string }[] = [
  { id: "artist", label: "Artist announcement" },
  { id: "large", label: "Large text" },
  { id: "grids", label: "Grids" },
  { id: "small", label: "Small text" },
];

export const textAligns: { id: TextAlign; label: string }[] = [
  { id: "left", label: "Left" },
  { id: "center", label: "Center" },
  { id: "right", label: "Right" },
];

export const textVAligns: { id: TextVAlign; label: string }[] = [
  { id: "top", label: "Top" },
  { id: "center", label: "Center" },
  { id: "bottom", label: "Bottom" },
];

export const seasonAccents: Record<Season, string[]> = {
  summer: ["#FCA0EB", "#A4F782"],
  winter: ["#FF562C", "#5C7FFF"],
};

export const universalColors = [
  "#98B5FC",
  "#CCC12C",
  "#2E202C",
  "#17212F",
  "#3E2D14",
  "#172420",
  "#2C1D12",
  "#453B33",
  "#0D0B0A",
  "#9CA3A0",
  "#EFE6D9",
  "#6C665B",
  "#A99D88",
  "#D3D3D3",
];

export function palette(season: Season): string[] {
  return [...seasonAccents[season], ...universalColors];
}

export function canvasSize(format: Format): { width: number; height: number } {
  return format === "post"
    ? { width: 1080, height: 1350 }
    : { width: 1080, height: 1920 };
}

export function overlayFolder(format: Format, lines: 1 | 2): string {
  const kind = format === "post" ? "Post" : "Story";
  const line = lines === 1 ? "1 line" : "2 lines";
  return `./media/${kind} ${line}`;
}

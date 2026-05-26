import type { YarnColor } from "@/types";

export type { YarnColor };

/** Kara Weaves cooperative yarn catalog — shared palette for all color roles. */
export const karaWeavesYarnColors: YarnColor[] = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "black", name: "Black", hex: "#1A1A1A" },
  { id: "brown", name: "Brown", hex: "#7A5C42" },
  { id: "peach", name: "Peach", hex: "#E8C4A0" },
  { id: "mustard", name: "Mustard", hex: "#C4A035" },
  { id: "sky-blue", name: "Sky Blue", hex: "#6BAED6" },
  { id: "dark-blue", name: "Dark Blue", hex: "#2A3D5C" },
  { id: "copper-blue", name: "Copper Blue", hex: "#4A8A94" },
  { id: "turquoise", name: "Turquoise", hex: "#3AABA8" },
  { id: "leaf-green", name: "Leaf Green", hex: "#6B9E5C" },
  { id: "dark-green", name: "Dark Green", hex: "#2F4F3A" },
  { id: "pink", name: "Pink", hex: "#E8A0B4" },
  { id: "lavender", name: "Lavender", hex: "#C4B5D8" },
  { id: "purple", name: "Purple", hex: "#7D5BA6" },
];

export const defaultYarnSelections = {
  base: "#E8C4A0",
  primary: "#2A3D5C",
  accent: "#C4A035",
} as const;

export function getYarnColorByHex(hex: string): YarnColor | undefined {
  const normalized = hex.toLowerCase();
  return karaWeavesYarnColors.find((c) => c.hex.toLowerCase() === normalized);
}

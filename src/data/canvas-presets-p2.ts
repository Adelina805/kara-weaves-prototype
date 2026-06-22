import type { CanvasPreset } from "@/types/stripe-editor";

export const canvasPresetsP2: CanvasPreset[] = [
  {
    id: "bath-towel",
    widthInches: 26,
    heightInches: 36,
    fabricLabel: "Bath Towel",
    label: '26" × 36" — Bath Towel',
  },
  {
    id: "kitchen-towel",
    widthInches: 18,
    heightInches: 28,
    fabricLabel: "Kitchen Towel",
    label: '18" × 28" — Kitchen Towel',
  },
  {
    id: "napkin",
    widthInches: 18,
    heightInches: 18,
    fabricLabel: "Napkin",
    label: '18" × 18" — Napkin',
  },
  {
    id: "furnishing",
    widthInches: 40,
    heightInches: 60,
    fabricLabel: "Furnishing Textile",
    label: '40" × 60" — Furnishing Textile',
  },
];

export const defaultCanvasPresetIdP2 = "bath-towel";

export function getCanvasPresetP2(id: string): CanvasPreset | undefined {
  return canvasPresetsP2.find((preset) => preset.id === id);
}

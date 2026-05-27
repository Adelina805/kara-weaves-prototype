import type { CanvasSizePreset } from "@/types";

/**
 * Finished-piece size presets aligned with Kara Weaves product dimensions.
 * @see https://www.karaweaves.com/products/tiny-towels
 * @see https://www.karaweaves.com/products/utility-napkin
 * @see https://www.karaweaves.com/products/many-stripe-napkins
 * @see https://www.karaweaves.com/products/bloc-stripe-kitchen-towels
 */
export const canvasSizePresets: CanvasSizePreset[] = [
  {
    id: "kw-tiny-9",
    label: '9″ × 9″ — Tiny Towel',
    widthInches: 9,
    heightInches: 9,
    maxColors: 4,
    notes: "Gauze tiny towel / cocktail napkin scale",
  },
  {
    id: "kw-utility-12",
    label: '12″ × 12″ — Utility napkin',
    widthInches: 12,
    heightInches: 12,
    maxColors: 4,
    notes: "Utility napkin square",
  },
  {
    id: "kw-napkin-18",
    label: '18″ × 18″ — Table napkin',
    widthInches: 18,
    heightInches: 18,
    maxColors: 6,
    notes: "Standard table napkin square",
  },
  {
    id: "kw-kitchen-18-28",
    label: '18″ × 28″ — Kitchen towel',
    widthInches: 18,
    heightInches: 28,
    maxColors: 6,
    notes: "Standard kitchen towel",
  },
  // Studio / loom reference widths — square canvas (height = reed width) for open-ended runs.
  {
    id: "loom-24",
    label: '24″ × 24″ — Handloom',
    widthInches: 24,
    heightInches: 24,
    maxColors: 4,
    notes: "Compact runs",
  },
  {
    id: "loom-30",
    label: '30″ × 30″ — Studio loom',
    widthInches: 30,
    heightInches: 30,
    maxColors: 5,
  },
  {
    id: "loom-36",
    label: '36″ × 36″ — Standard loom',
    widthInches: 36,
    heightInches: 36,
    maxColors: 6,
    notes: "Most towel templates",
  },
  {
    id: "loom-48",
    label: '48″ × 48″ — Wide loom',
    widthInches: 48,
    heightInches: 48,
    maxColors: 8,
    notes: "Hospitality runs",
  },
];

export const defaultCanvasPresetId = "loom-36";

export function getCanvasPresetById(
  id: string
): CanvasSizePreset | undefined {
  return canvasSizePresets.find((p) => p.id === id);
}

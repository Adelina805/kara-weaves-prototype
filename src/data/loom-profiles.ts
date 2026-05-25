import type { LoomProfile } from "@/types";

export const loomProfiles: LoomProfile[] = [
  {
    id: "loom-24",
    name: "24″ handloom",
    widthInches: 24,
    maxColors: 4,
    notes: "Compact runs",
  },
  {
    id: "loom-30",
    name: "30″ studio loom",
    widthInches: 30,
    maxColors: 5,
  },
  {
    id: "loom-36",
    name: "36″ standard loom",
    widthInches: 36,
    maxColors: 6,
    notes: "Most towel templates",
  },
  {
    id: "loom-48",
    name: "48″ wide loom",
    widthInches: 48,
    maxColors: 8,
    notes: "Hospitality runs",
  },
];

export const defaultLoomWidth = 36;

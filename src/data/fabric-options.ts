export type FabricOption = {
  id: string;
  label: string;
  weaveThickness: string;
  textileCategory: string;
  fabricPreset: string;
};

export const fabricOptions: readonly FabricOption[] = [
  {
    id: "bath-towel",
    label: "Bath towel",
    weaveThickness: "dense",
    textileCategory: "towel",
    fabricPreset: "bath-towel",
  },
  {
    id: "hand-towel",
    label: "Hand towel",
    weaveThickness: "dense",
    textileCategory: "towel",
    fabricPreset: "hand-towel",
  },
  {
    id: "hospitality-set",
    label: "Hospitality set",
    weaveThickness: "standard",
    textileCategory: "hospitality",
    fabricPreset: "hospitality-set",
  },
  {
    id: "table-runner",
    label: "Table runner",
    weaveThickness: "standard",
    textileCategory: "runner",
    fabricPreset: "table-runner",
  },
  {
    id: "light-scarf",
    label: "Light scarf",
    weaveThickness: "light",
    textileCategory: "scarf",
    fabricPreset: "scarf-light",
  },
  {
    id: "kitchen-towel",
    label: "Kitchen / Tea towel",
    weaveThickness: "standard",
    textileCategory: "towel",
    fabricPreset: "kitchen-towel",
  },
  {
    id: "napkin",
    label: "Table napkin",
    weaveThickness: "light",
    textileCategory: "napkin",
    fabricPreset: "napkin",
  },
  {
    id: "tiny-towel",
    label: "Tiny / Travel towel",
    weaveThickness: "light",
    textileCategory: "towel",
    fabricPreset: "tiny-towel",
  },
  {
    id: "large-textile",
    label: "Large textile / throw",
    weaveThickness: "dense",
    textileCategory: "textile",
    fabricPreset: "large-textile",
  },
  {
    id: "robe",
    label: "Robe",
    weaveThickness: "dense",
    textileCategory: "clothing",
    fabricPreset: "robe",
  },
  {
    id: "coaster",
    label: "Coaster",
    weaveThickness: "light",
    textileCategory: "accessory",
    fabricPreset: "coaster",
  },
] as const;

export function getFabricOptionById(id: string): FabricOption | undefined {
  return fabricOptions.find((opt) => opt.id === id);
}

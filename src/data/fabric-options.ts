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
] as const;

export function getFabricOptionById(id: string): FabricOption | undefined {
  return fabricOptions.find((opt) => opt.id === id);
}

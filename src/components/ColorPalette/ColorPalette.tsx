"use client";

import { editableColorRoles } from "@/data/color-roles";
import { karaWeavesYarnColors } from "@/data/yarn-colors";
import type { CustomizationState } from "@/types";
import { ColorRow } from "@/components/ColorRow/ColorRow";
import styles from "./ColorPalette.module.css";

type ColorPaletteProps = {
  colors: CustomizationState["colors"];
  onColorChange: (
    role: keyof CustomizationState["colors"],
    hex: string
  ) => void;
};

export function ColorPalette({ colors, onColorChange }: ColorPaletteProps) {
  return (
    <div className={styles.palette} aria-label="Yarn colors">
      {editableColorRoles.map(({ key, label }) => (
        <ColorRow
          key={key}
          label={label}
          selectedHex={colors[key]}
          yarns={karaWeavesYarnColors}
          onSelect={(hex) => onColorChange(key, hex)}
        />
      ))}
    </div>
  );
}

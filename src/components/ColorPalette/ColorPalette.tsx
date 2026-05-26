"use client";

import { useState } from "react";
import {
  getYarnColorByHex,
  karaWeavesYarnColors,
} from "@/data/yarn-colors";
import { editableColorRoles } from "@/data/color-roles";
import type { CustomizationState } from "@/types";
import { ColorSwatch } from "@/components/ColorSwatch/ColorSwatch";
import styles from "./ColorPalette.module.css";

type ColorPaletteProps = {
  colors: CustomizationState["colors"];
  onColorChange: (
    role: keyof CustomizationState["colors"],
    hex: string
  ) => void;
};

export function ColorPalette({ colors, onColorChange }: ColorPaletteProps) {
  const [activeRole, setActiveRole] =
    useState<keyof CustomizationState["colors"]>("base");

  const activeHex = colors[activeRole];
  const activeYarn = getYarnColorByHex(activeHex);
  const activeRoleLabel =
    editableColorRoles.find((r) => r.key === activeRole)?.label ?? activeRole;

  return (
    <div className={styles.palette}>
      <div
        className={styles.roleTabs}
        role="tablist"
        aria-label="Color role"
      >
        {editableColorRoles.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`color-role-${key}`}
            aria-selected={activeRole === key}
            aria-controls="yarn-palette-grid"
            className={styles.roleTab}
            data-active={activeRole === key || undefined}
            onClick={() => setActiveRole(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        id="yarn-palette-grid"
        role="tabpanel"
        aria-labelledby={`color-role-${activeRole}`}
        className={styles.grid}
      >
        {karaWeavesYarnColors.map((yarn) => (
          <ColorSwatch
            key={yarn.id}
            hex={yarn.hex}
            label={yarn.name}
            size="compact"
            selected={activeHex === yarn.hex}
            onSelect={() => onColorChange(activeRole, yarn.hex)}
          />
        ))}
      </div>

      <p className={styles.selection} aria-live="polite">
        <span className={styles.selectionRole}>{activeRoleLabel}</span>
        <span className={styles.selectionName}>
          {activeYarn?.name ?? activeHex}
        </span>
      </p>
    </div>
  );
}

"use client";

import { customizableColors } from "@/data/color-palettes";
import { fabricOptions } from "@/data/fabric-options";
import { loomProfiles } from "@/data/loom-profiles";
import { textileTemplates } from "@/data/templates";
import type { ConstraintWarning, CustomizationState } from "@/types";
import { ColorSwatch } from "@/components/ColorSwatch/ColorSwatch";
import { PatternPresetCard } from "@/components/PatternPresetCard/PatternPresetCard";
import { SidebarModule } from "@/components/SidebarModule/SidebarModule";
import { WarningCallout } from "@/components/WarningCallout/WarningCallout";
import styles from "./ControlsSidebar.module.css";

type ControlsSidebarProps = {
  state: CustomizationState;
  warnings: ConstraintWarning[];
  onTemplateChange: (templateId: string) => void;
  onLoomChange: (width: number) => void;
  onColorChange: (
    role: keyof CustomizationState["colors"],
    hex: string
  ) => void;
  onFabricOptionChange: (value: string) => void;
};

export function ControlsSidebar({
  state,
  warnings,
  onTemplateChange,
  onLoomChange,
  onColorChange,
  onFabricOptionChange,
}: ControlsSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Customization controls">
      <SidebarModule label="Width / canvas">
        <label className={styles.field} htmlFor="loom-width">
          <select
            id="loom-width"
            className={styles.select}
            aria-label="Loom width"
            value={state.loomWidth}
            onChange={(e) => onLoomChange(Number(e.target.value))}
          >
            {loomProfiles.map((loom) => (
              <option key={loom.id} value={loom.widthInches}>
                {loom.widthInches}″ — {loom.name}
              </option>
            ))}
          </select>
        </label>
      </SidebarModule>

      <SidebarModule label="Fabric options">
        <label className={styles.field} htmlFor="fabric-option">
          <select
            id="fabric-option"
            className={styles.select}
            aria-label="Fabric options"
            value={state.fabricOption}
            onChange={(e) => onFabricOptionChange(e.target.value)}
          >
            {fabricOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </SidebarModule>

      <SidebarModule label="Pattern presets">
        <div className={styles.presets}>
          {textileTemplates.map((template) => (
            <PatternPresetCard
              key={template.id}
              template={template}
              selected={state.templateId === template.id}
              colors={state.colors}
              onSelect={() => onTemplateChange(template.id)}
            />
          ))}
        </div>
      </SidebarModule>

      <SidebarModule label="Colors">
        {(["base", "primary", "accent"] as const).map((role) => (
          <div key={role} className={styles.colorGroup}>
            <span className={styles.fieldLabel}>{role}</span>
            <div className={styles.swatches} role="group" aria-label={role}>
              {customizableColors[role].map((swatch) => (
                <ColorSwatch
                  key={swatch.id}
                  hex={swatch.hex}
                  label={swatch.label}
                  selected={state.colors[role] === swatch.hex}
                  onSelect={() => onColorChange(role, swatch.hex)}
                />
              ))}
            </div>
          </div>
        ))}
      </SidebarModule>

      {warnings.length > 0 && (
        <WarningCallout warnings={warnings} />
      )}
    </aside>
  );
}

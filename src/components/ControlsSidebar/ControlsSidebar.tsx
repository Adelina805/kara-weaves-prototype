"use client";

import { fabricOptions } from "@/data/fabric-options";
import { loomProfiles } from "@/data/loom-profiles";
import { textileTemplates } from "@/data/templates";
import type { ConstraintWarning, CustomizationState } from "@/types";
import { ColorPalette } from "@/components/ColorPalette/ColorPalette";
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
      <header className={styles.header}>
        <h1 className={styles.title}>Design workspace</h1>
        <p className={styles.subtitle}>Configure weave, pattern, and color</p>
      </header>

      <div className={styles.scroll}>
        <SidebarModule label="Width / Canvas" compact>
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

        <SidebarModule label="Fabric" compact>
          <label className={styles.field} htmlFor="fabric-option">
            <select
              id="fabric-option"
              className={styles.select}
              aria-label="Textile type"
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

        <SidebarModule label="Pattern" compact>
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

        <SidebarModule label="Colors" compact>
          <ColorPalette colors={state.colors} onColorChange={onColorChange} />
        </SidebarModule>

        {warnings.length > 0 && (
          <SidebarModule label="Constraints" compact>
            <WarningCallout warnings={warnings} compact />
          </SidebarModule>
        )}
      </div>
    </aside>
  );
}

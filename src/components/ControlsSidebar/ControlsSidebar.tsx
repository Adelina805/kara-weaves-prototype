"use client";

import { canvasSizePresets } from "@/data/canvas-size-presets";
import { fabricOptions } from "@/data/fabric-options";
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
  onCanvasPresetChange: (presetId: string) => void;
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
  onCanvasPresetChange,
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
          <label className={styles.field} htmlFor="canvas-preset">
            <select
              id="canvas-preset"
              className={styles.select}
              aria-label="Canvas size preset"
              value={state.canvasPresetId}
              onChange={(e) => onCanvasPresetChange(e.target.value)}
            >
              {canvasSizePresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
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
          <div className={styles.presetsScroll}>
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
          </div>
        </SidebarModule>

        <SidebarModule label="Palette" compact>
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

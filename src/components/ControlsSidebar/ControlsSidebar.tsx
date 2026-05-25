"use client";

import { customizableColors } from "@/data/color-palettes";
import {
  fabricPresetOptions,
  textileCategoryOptions,
  weaveThicknessOptions,
} from "@/data/fabric-options";
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
  recommendedWidth?: number;
  warnings: ConstraintWarning[];
  onTemplateChange: (templateId: string) => void;
  onLoomChange: (width: number) => void;
  onColorChange: (
    role: keyof CustomizationState["colors"],
    hex: string
  ) => void;
  onWeaveThicknessChange: (value: string) => void;
  onTextileCategoryChange: (value: string) => void;
  onFabricPresetChange: (value: string) => void;
};

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly { id: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.fieldLabel}>{label}</span>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ControlsSidebar({
  state,
  recommendedWidth,
  warnings,
  onTemplateChange,
  onLoomChange,
  onColorChange,
  onWeaveThicknessChange,
  onTextileCategoryChange,
  onFabricPresetChange,
}: ControlsSidebarProps) {
  const canvasHeightIn = 72;
  const totalPicksEstimate = Math.round(canvasHeightIn * 40);

  return (
    <aside className={styles.sidebar} aria-label="Customization controls">
      <SidebarModule label="Width / canvas">
        <label className={styles.field} htmlFor="loom-width">
          <span className={styles.fieldLabel}>Loom width</span>
          <select
            id="loom-width"
            className={styles.select}
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
        <dl className={styles.dimensions}>
          <div>
            <dt>Canvas</dt>
            <dd>
              {state.loomWidth}″ × {canvasHeightIn}″
            </dd>
          </div>
          {recommendedWidth != null && (
            <div>
              <dt>Recommended</dt>
              <dd>{recommendedWidth}″</dd>
            </div>
          )}
          <div>
            <dt>Est. picks</dt>
            <dd>{totalPicksEstimate}</dd>
          </div>
        </dl>
      </SidebarModule>

      <SidebarModule label="Fabric options">
        <SelectField
          id="weave-thickness"
          label="Weave thickness"
          value={state.weaveThickness}
          options={weaveThicknessOptions}
          onChange={onWeaveThicknessChange}
        />
        <SelectField
          id="textile-category"
          label="Textile category"
          value={state.textileCategory}
          options={textileCategoryOptions}
          onChange={onTextileCategoryChange}
        />
        <SelectField
          id="fabric-preset"
          label="Preset"
          value={state.fabricPreset}
          options={fabricPresetOptions}
          onChange={onFabricPresetChange}
        />
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

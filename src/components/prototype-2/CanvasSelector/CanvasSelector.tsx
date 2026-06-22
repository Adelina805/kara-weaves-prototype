import type { CanvasPreset } from "@/types/stripe-editor";
import styles from "./CanvasSelector.module.css";

type CanvasSelectorProps = {
  presets: CanvasPreset[];
  value: string;
  onChange: (presetId: string) => void;
};

export function CanvasSelector({ presets, value, onChange }: CanvasSelectorProps) {
  return (
    <select
      id="canvas-selector"
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Select canvas size and fabric type"
    >
      {presets.map((preset) => (
        <option key={preset.id} value={preset.id}>
          {preset.label}
        </option>
      ))}
    </select>
  );
}

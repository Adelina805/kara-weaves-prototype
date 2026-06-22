import { STRIPE_WIDTH_PRESETS } from "@/utils/stripe-layout";
import styles from "./StripeWidthControl.module.css";

type StripeWidthControlProps = {
  value: number;
  onChange: (width: number) => void;
};

const MAX_PRESET_WIDTH = 3;
const MAX_BAR_HEIGHT = 24;

function formatLabel(value: number): string {
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(/0$/, "");
}

function presetBarHeight(width: number): number {
  return Math.max(2, (width / MAX_PRESET_WIDTH) * MAX_BAR_HEIGHT);
}

export function StripeWidthControl({ value, onChange }: StripeWidthControlProps) {
  return (
    <div className={styles.presets} role="group" aria-label="Stripe width presets">
      {STRIPE_WIDTH_PRESETS.map((preset) => {
        const isActive = value === preset;

        return (
          <button
            key={preset}
            type="button"
            className={styles.preset}
            data-active={isActive || undefined}
            onClick={() => onChange(preset)}
            aria-label={`${preset} inches`}
            aria-pressed={isActive}
            title={`${preset}"`}
          >
            <span className={styles.visualArea} aria-hidden>
              <span
                className={styles.bar}
                style={{ height: presetBarHeight(preset) }}
              />
            </span>
            <span className={styles.label}>{formatLabel(preset)}</span>
          </button>
        );
      })}
    </div>
  );
}

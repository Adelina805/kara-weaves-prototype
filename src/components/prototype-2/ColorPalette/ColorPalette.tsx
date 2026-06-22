import { karaWeavesYarnColors } from "@/data/yarn-colors";
import styles from "./ColorPalette.module.css";

type ColorPaletteProps = {
  selectedColor: string;
  onColorChange: (hex: string) => void;
};

export function ColorPalette({
  selectedColor,
  onColorChange,
}: ColorPaletteProps) {
  return (
    <div className={styles.palette} role="group" aria-label="Color palette">
      <div className={styles.swatches}>
        {karaWeavesYarnColors.map((color) => {
          const isSelected =
            color.hex.toLowerCase() === selectedColor.toLowerCase();

          return (
            <button
              key={color.id}
              type="button"
              className={styles.swatch}
              data-selected={isSelected || undefined}
              onClick={() => onColorChange(color.hex)}
              aria-label={color.name}
              aria-pressed={isSelected}
              title={color.name}
            >
              <span
                className={styles.circle}
                style={{ backgroundColor: color.hex }}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

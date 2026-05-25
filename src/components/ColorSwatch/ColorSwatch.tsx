import styles from "./ColorSwatch.module.css";

type ColorSwatchProps = {
  hex: string;
  label: string;
  selected?: boolean;
  onSelect: () => void;
};

export function ColorSwatch({
  hex,
  label,
  selected = false,
  onSelect,
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      className={styles.swatch}
      data-selected={selected || undefined}
      onClick={onSelect}
      aria-label={label}
      aria-pressed={selected}
      title={label}
    >
      <span
        className={styles.circle}
        style={{ backgroundColor: hex }}
        aria-hidden
      />
    </button>
  );
}

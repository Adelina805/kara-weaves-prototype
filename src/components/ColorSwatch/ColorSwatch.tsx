import styles from "./ColorSwatch.module.css";

type ColorSwatchProps = {
  hex: string;
  label: string;
  selected?: boolean;
  /** Default buttons; `row` uses quiet unselected / emphasized selected sizing. */
  variant?: "default" | "row";
  onSelect: () => void;
};

export function ColorSwatch({
  hex,
  label,
  selected = false,
  variant = "default",
  onSelect,
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      className={styles.swatch}
      data-variant={variant !== "default" ? variant : undefined}
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

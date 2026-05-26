import type { TextileTemplate } from "@/types";
import { resolveColor } from "@/utils/spec-generation";
import styles from "./PatternPresetCard.module.css";

type PatternPresetCardProps = {
  template: TextileTemplate;
  selected: boolean;
  colors: { base: string; primary: string; accent: string };
  onSelect: () => void;
};

function MiniStripePreview({
  template,
  colors,
}: {
  template: TextileTemplate;
  colors: PatternPresetCardProps["colors"];
}) {
  const thumbHeight = 32;
  const total = template.layers.reduce((s, l) => s + l.heightInches, 0);
  let y = 0;
  const segments = template.layers.map((layer, index, layers) => {
    const isLast = index === layers.length - 1;
    const h = isLast
      ? thumbHeight - y
      : (layer.heightInches / total) * thumbHeight;
    const segment = { y, h, fill: resolveColor(layer.colorRole, colors) };
    y += h;
    return segment;
  });
  const bands = segments.map((seg, i) => (
    <rect
      key={i}
      x={0}
      y={seg.y}
      width={48}
      height={seg.h}
      fill={seg.fill}
    />
  ));

  return (
    <svg
      viewBox="0 0 48 32"
      width={48}
      height={32}
      className={styles.thumb}
      aria-hidden
    >
      {bands}
    </svg>
  );
}

export function PatternPresetCard({
  template,
  selected,
  colors,
  onSelect,
}: PatternPresetCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      data-selected={selected || undefined}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <MiniStripePreview template={template} colors={colors} />
      <span className={styles.name}>{template.name}</span>
    </button>
  );
}

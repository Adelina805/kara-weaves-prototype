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
  const total = template.layers.reduce((s, l) => s + l.heightInches, 0);
  const segments = template.layers.reduce<
    { y: number; h: number; fill: string }[]
  >((acc, layer) => {
    const h = (layer.heightInches / total) * 40;
    const y = acc.reduce((sum, seg) => sum + seg.h, 0);
    return [
      ...acc,
      { y, h, fill: resolveColor(layer.colorRole, colors) },
    ];
  }, []);
  const bands = segments.map((seg, i) => (
    <rect
      key={i}
      x={0}
      y={seg.y}
      width={56}
      height={seg.h}
      fill={seg.fill}
    />
  ));

  return (
    <svg
      viewBox="0 0 56 40"
      width={56}
      height={40}
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

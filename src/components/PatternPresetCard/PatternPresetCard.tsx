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

  type Segment = { y: number; h: number; fill: string };
  const { segments } = template.layers.reduce<{
    segments: Segment[];
    yCursor: number;
  }>(
    (state, layer, index) => {
      const isLast = index === template.layers.length - 1;
      const h = isLast
        ? thumbHeight - state.yCursor
        : (layer.heightInches / total) * thumbHeight;
      return {
        segments: [
          ...state.segments,
          {
            y: state.yCursor,
            h,
            fill: resolveColor(layer.colorRole, colors),
          },
        ],
        yCursor: state.yCursor + h,
      };
    },
    { segments: [], yCursor: 0 },
  );

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

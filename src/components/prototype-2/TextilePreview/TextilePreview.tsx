import type { CSSProperties } from "react";
import type { Stripe } from "@/types/stripe-editor";
import { GapZone, StripeLayer } from "@/components/prototype-2/StripeLayer/StripeLayer";
import styles from "./TextilePreview.module.css";

const PREVIEW_WIDTH = 560;
const GAP_HIT_HEIGHT = 12;

type TextilePreviewProps = {
  stripes: Stripe[];
  canvasWidthInches: number;
  canvasHeightInches: number;
  hoveredStripeId: string | null;
  hoveredGapIndex: number | null;
  onStripePaint: (stripeId: string) => void;
  onGapInsert: (insertIndex: number) => void;
  onStripeHover: (stripeId: string | null) => void;
  onGapHover: (insertIndex: number | null) => void;
};

function FixedWarpGrid({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const lines: number[] = [];
  const step = Math.max(6, width / 14);

  for (let x = step / 2; x < width; x += step) {
    lines.push(x);
  }

  return (
    <g aria-hidden pointerEvents="none">
      {lines.map((x) => (
        <line
          key={x}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="#1c1b19"
          strokeOpacity={0.06}
          strokeWidth={0.75}
          strokeDasharray="2 4"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </g>
  );
}

export function TextilePreview({
  stripes,
  canvasWidthInches,
  canvasHeightInches,
  hoveredStripeId,
  hoveredGapIndex,
  onStripePaint,
  onGapInsert,
  onStripeHover,
  onGapHover,
}: TextilePreviewProps) {
  const previewHeight =
    PREVIEW_WIDTH * (canvasHeightInches / canvasWidthInches);
  const pixelsPerInch = previewHeight / canvasHeightInches;

  let currentY = 0;
  const stripeLayouts = stripes.map((stripe) => {
    const height = stripe.widthInches * pixelsPerInch;
    const layout = { stripe, y: currentY, height };
    currentY += height;
    return layout;
  });

  const canvasStyle = {
    "--preview-width": `${PREVIEW_WIDTH}px`,
    "--preview-aspect-ratio": `${PREVIEW_WIDTH} / ${previewHeight}`,
  } as CSSProperties;

  const gapZones: { insertIndex: number; y: number }[] = [
    { insertIndex: 0, y: 0 },
  ];

  stripeLayouts.forEach(({ y, height }, index) => {
    gapZones.push({ insertIndex: index + 1, y: y + height });
  });

  return (
    <div className={styles.wrap}>
      <figure className={styles.figure}>
        <svg
          viewBox={`0 0 ${PREVIEW_WIDTH} ${previewHeight}`}
          className={styles.canvas}
          style={canvasStyle}
          role="img"
          aria-label="Interactive woven stripe textile"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x={0}
            y={0}
            width={PREVIEW_WIDTH}
            height={previewHeight}
            fill="#faf9f7"
          />
          <FixedWarpGrid width={PREVIEW_WIDTH} height={previewHeight} />

          {stripeLayouts.map(({ stripe, y, height }) => (
            <StripeLayer
              key={stripe.id}
              stripeId={stripe.id}
              x={0}
              y={y}
              width={PREVIEW_WIDTH}
              height={height}
              color={stripe.color}
              isHovered={hoveredStripeId === stripe.id}
              onPaint={onStripePaint}
              onHover={onStripeHover}
            />
          ))}

          {gapZones.map(({ insertIndex, y }) => {
            const gapY =
              insertIndex === 0
                ? Math.max(0, y - GAP_HIT_HEIGHT / 2)
                : y - GAP_HIT_HEIGHT / 2;

            return (
              <GapZone
                key={`gap-${insertIndex}`}
                x={0}
                y={gapY}
                width={PREVIEW_WIDTH}
                height={GAP_HIT_HEIGHT}
                insertIndex={insertIndex}
                isHovered={hoveredGapIndex === insertIndex}
                onInsert={onGapInsert}
                onHover={onGapHover}
              />
            );
          })}
        </svg>
      </figure>
    </div>
  );
}

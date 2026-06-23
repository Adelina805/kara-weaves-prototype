"use client";

import type { CSSProperties, MouseEvent } from "react";
import type { Stripe } from "@/types/stripe-editor";
import {
  GRID_STEP_INCHES,
  getStripeAt,
  inchesFromPreviewY,
  layoutStripeHeights,
  snapToGrid,
} from "@/utils/stripe-layout";
import { StripeLayer } from "@/components/prototype-2/StripeLayer/StripeLayer";
import styles from "./TextilePreview.module.css";

const PREVIEW_WIDTH = 560;

type TextilePreviewProps = {
  stripes: Stripe[];
  canvasWidthInches: number;
  canvasHeightInches: number;
  hoveredStripeId: string | null;
  onStripePaint: (stripeId: string) => void;
  onCanvasPlace: (startInches: number) => void;
  onStripeHover: (stripeId: string | null) => void;
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

function HorizontalRowGrid({
  width,
  previewHeight,
  canvasHeightInches,
}: {
  width: number;
  previewHeight: number;
  canvasHeightInches: number;
}) {
  const pixelsPerInch = previewHeight / canvasHeightInches;
  const lines: number[] = [];

  for (
    let inches = GRID_STEP_INCHES;
    inches < canvasHeightInches;
    inches += GRID_STEP_INCHES
  ) {
    lines.push(inches * pixelsPerInch);
  }

  return (
    <g aria-hidden pointerEvents="none">
      {lines.map((y) => (
        <line
          key={y}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="#1c1b19"
          strokeOpacity={0.08}
          strokeWidth={0.5}
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
  onStripePaint,
  onCanvasPlace,
  onStripeHover,
}: TextilePreviewProps) {
  const previewHeight =
    PREVIEW_WIDTH * (canvasHeightInches / canvasWidthInches);
  const stripeLayouts = layoutStripeHeights(
    stripes,
    canvasHeightInches,
    previewHeight
  );

  const canvasStyle = {
    "--preview-width": `${PREVIEW_WIDTH}px`,
    "--preview-aspect-ratio": `${PREVIEW_WIDTH} / ${previewHeight}`,
  } as CSSProperties;

  function handleCanvasClick(event: MouseEvent<SVGSVGElement>) {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleY = previewHeight / rect.height;
    const clickY = (event.clientY - rect.top) * scaleY;
    const inches = inchesFromPreviewY(clickY, previewHeight, canvasHeightInches);
    const hit = getStripeAt(stripes, inches);

    if (hit) {
      onStripePaint(hit.id);
      return;
    }

    onCanvasPlace(snapToGrid(inches));
  }

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
          onClick={handleCanvasClick}
        >
          <rect
            x={0}
            y={0}
            width={PREVIEW_WIDTH}
            height={previewHeight}
            fill="#FFFFFF"
          />
          <HorizontalRowGrid
            width={PREVIEW_WIDTH}
            previewHeight={previewHeight}
            canvasHeightInches={canvasHeightInches}
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
              onHover={onStripeHover}
            />
          ))}
        </svg>
      </figure>
    </div>
  );
}

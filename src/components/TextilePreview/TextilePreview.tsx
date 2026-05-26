import type { CSSProperties } from "react";
import type { ResolvedStripeLayer } from "@/types";
import {
  layersToPreviewSections,
  PREVIEW_HEIGHT,
  type PreviewBand,
} from "@/utils/pattern-renderer";
import styles from "./TextilePreview.module.css";

type TextilePreviewProps = {
  layers: ResolvedStripeLayer[];
  loomWidth: number;
};

function WeaveLines({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const lines: { y: number; opacity: number }[] = [];
  const step = Math.max(2, height / 6);
  for (let ly = y + step / 2; ly < y + height; ly += step) {
    lines.push({ y: ly, opacity: 0.06 + (Math.floor(ly) % 3) * 0.02 });
  }
  return (
    <>
      {lines.map((line, i) => (
        <line
          key={i}
          x1={x}
          y1={line.y}
          x2={x + width}
          y2={line.y}
          stroke="#1c1b19"
          strokeOpacity={line.opacity}
          strokeWidth={0.5}
        />
      ))}
    </>
  );
}

function StripeBands({
  bands,
  width,
  offsetY,
}: {
  bands: PreviewBand[];
  width: number;
  offsetY: number;
}) {
  return (
    <>
      {bands.map((band, i) => (
        <g key={i}>
          <rect
            x={0}
            y={offsetY + band.y}
            width={width}
            height={band.height}
            fill={band.color}
          />
          <WeaveLines
            x={0}
            y={offsetY + band.y}
            width={width}
            height={band.height}
          />
          {band.layerType === "border" && (
            <line
              x1={0}
              y1={offsetY + band.y}
              x2={width}
              y2={offsetY + band.y}
              stroke="#1c1b19"
              strokeOpacity={0.12}
              strokeWidth={0.75}
            />
          )}
        </g>
      ))}
    </>
  );
}

export function TextilePreview({ layers, loomWidth }: TextilePreviewProps) {
  const { width: previewWidth, top, bottom } = layersToPreviewSections(
    layers,
    { loomWidth }
  );

  const canvasStyle = {
    "--preview-canvas-width": `${previewWidth}px`,
    "--preview-aspect-ratio": `${previewWidth} / ${PREVIEW_HEIGHT}`,
  } as CSSProperties;

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <span className={styles.metaLabel}>Preview</span>
        <span className={styles.metaValue}>
          {loomWidth}″ loom · SVG mockup
        </span>
      </div>
      <figure className={styles.figure}>
        <svg
          viewBox={`0 0 ${previewWidth} ${PREVIEW_HEIGHT}`}
          className={styles.canvas}
          style={canvasStyle}
          role="img"
          aria-label="Woven stripe textile preview"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x={0}
            y={0}
            width={previewWidth}
            height={PREVIEW_HEIGHT}
            fill="#ffffff"
          />
          <StripeBands bands={top.bands} width={previewWidth} offsetY={0} />
          <line
            x1={0}
            y1={top.height}
            x2={previewWidth}
            y2={top.height}
            stroke="#e5e3df"
            strokeWidth={0.5}
            strokeDasharray="2 3"
          />
          <StripeBands
            bands={bottom.bands}
            width={previewWidth}
            offsetY={top.height}
          />
        </svg>
        <figcaption className={styles.caption}>
          Upper field · repeat ×3 — lower selvedge · repeat ×1
        </figcaption>
      </figure>
    </div>
  );
}

import type { CSSProperties } from "react";
import type { ResolvedStripeLayer } from "@/types";
import {
  layersToPreviewSections,
  type PreviewBand,
} from "@/utils/pattern-renderer";
import styles from "./TextilePreview.module.css";

type TextilePreviewProps = {
  layers: ResolvedStripeLayer[];
  loomWidth: number;
  canvasHeightInches: number;
};

function WarpLines({
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
  const lines: { x: number; opacity: number }[] = [];
  const step = Math.max(4, width / 18);
  for (let lx = x + step / 2; lx < x + width; lx += step) {
    lines.push({
      x: lx,
      opacity: 0.04 + ((Math.floor(lx) % 5) * 0.01 + ((lx / step) % 1) * 0.01),
    });
  }
  return (
    <>
      {lines.map((line, i) => (
        <line
          key={i}
          x1={line.x}
          y1={y}
          x2={line.x}
          y2={y + height}
          stroke="#211e1a"
          strokeOpacity={line.opacity}
          strokeWidth={0.4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}

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
    const bandMod = Math.floor(ly) % 4;
    lines.push({
      y: ly + (bandMod === 1 ? 0.2 : bandMod === 3 ? -0.15 : 0),
      opacity: 0.05 + bandMod * 0.02,
    });
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
          stroke="#211e1a"
          strokeOpacity={line.opacity}
          strokeWidth={0.55}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
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
          <WarpLines
            x={0}
            y={offsetY + band.y}
            width={width}
            height={band.height}
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

export function TextilePreview({
  layers,
  loomWidth,
  canvasHeightInches,
}: TextilePreviewProps) {
  const { width: previewWidth, top, bottom, totalHeight } =
    layersToPreviewSections(layers, {
      loomWidth,
      canvasHeightInches,
    });

  const canvasStyle = {
    "--preview-canvas-width": `${previewWidth}px`,
    "--preview-aspect-ratio": `${previewWidth} / ${totalHeight}`,
  } as CSSProperties;

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <span className={styles.metaLabel}>Preview</span>
        <span className={styles.metaValue}>
          {loomWidth}″ × {canvasHeightInches}″ canvas · SVG mockup
        </span>
      </div>
      <figure className={styles.figure}>
        <svg
          viewBox={`0 0 ${previewWidth} ${totalHeight}`}
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
            height={totalHeight}
            fill="#faf9f7"
          />
          <StripeBands bands={top.bands} width={previewWidth} offsetY={0} />
          <line
            x1={0}
            y1={top.height}
            x2={previewWidth}
            y2={top.height}
            stroke="#e8e6e3"
            strokeWidth={0.5}
            strokeDasharray="2 3"
          />
          <StripeBands
            bands={bottom.bands}
            width={previewWidth}
            offsetY={top.height}
          />
        </svg>
      </figure>
    </div>
  );
}

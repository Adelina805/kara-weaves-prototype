type StripeLayerProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  stripeId: string;
  isHovered: boolean;
  onPaint: (stripeId: string) => void;
  onHover: (stripeId: string | null) => void;
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
      opacity: 0.05 + (Math.floor(lx) % 5) * 0.012,
    });
  }

  return (
    <>
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.x}
          y1={y}
          x2={line.x}
          y2={y + height}
          stroke="#211e1a"
          strokeOpacity={line.opacity}
          strokeWidth={0.45}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
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
  const step = Math.max(2, height / 5);

  for (let ly = y + step / 2; ly < y + height; ly += step) {
    lines.push({ y: ly, opacity: 0.06 });
  }

  return (
    <>
      {lines.map((line, index) => (
        <line
          key={index}
          x1={x}
          y1={line.y}
          x2={x + width}
          y2={line.y}
          stroke="#211e1a"
          strokeOpacity={line.opacity}
          strokeWidth={0.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
        />
      ))}
    </>
  );
}

export function StripeLayer({
  x,
  y,
  width,
  height,
  color,
  stripeId,
  isHovered,
  onPaint,
  onHover,
}: StripeLayerProps) {
  return (
    <g
      onMouseEnter={() => onHover(stripeId)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onPaint(stripeId)}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke={isHovered ? "#6b6862" : "transparent"}
        strokeWidth={isHovered ? 1 : 0}
        vectorEffect="non-scaling-stroke"
      />
      {isHovered && (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#ffffff"
          fillOpacity={0.1}
          pointerEvents="none"
        />
      )}
      <WarpLines x={x} y={y} width={width} height={height} />
      <WeaveLines x={x} y={y} width={width} height={height} />
    </g>
  );
}

type GapZoneProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  insertIndex: number;
  isHovered: boolean;
  onInsert: (insertIndex: number) => void;
  onHover: (insertIndex: number | null) => void;
};

export function GapZone({
  x,
  y,
  width,
  height,
  insertIndex,
  isHovered,
  onInsert,
  onHover,
}: GapZoneProps) {
  return (
    <g
      onMouseEnter={() => onHover(insertIndex)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onInsert(insertIndex)}
      style={{ cursor: "crosshair" }}
    >
      <rect x={x} y={y} width={width} height={height} fill="transparent" />
      {isHovered && (
        <line
          x1={x}
          y1={y + height / 2}
          x2={x + width}
          y2={y + height / 2}
          stroke="#1c1b19"
          strokeOpacity={0.35}
          strokeWidth={1.5}
          strokeDasharray="3 2"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
        />
      )}
    </g>
  );
}

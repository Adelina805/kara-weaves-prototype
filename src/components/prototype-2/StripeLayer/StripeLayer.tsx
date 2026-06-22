type StripeLayerProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  stripeId: string;
  isHovered: boolean;
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
  onHover,
}: StripeLayerProps) {
  return (
    <g
      onMouseEnter={() => onHover(stripeId)}
      onMouseLeave={() => onHover(null)}
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

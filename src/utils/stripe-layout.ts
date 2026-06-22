import type { Stripe } from "@/types/stripe-editor";

const MIN_STRIPE_WIDTH = 0.25;

let stripeCounter = 0;

export function createStripeId(): string {
  stripeCounter += 1;
  return `stripe-${stripeCounter}`;
}

export function createDefaultStripes(
  canvasHeightInches: number,
  count = 8
): Stripe[] {
  const palette = [
    "#FFFFFF",
    "#2A3D5C",
    "#6BAED6",
    "#FFFFFF",
    "#1A1A1A",
    "#E8C4A0",
    "#FFFFFF",
    "#2A3D5C",
  ];
  const widthInches = roundToQuarter(canvasHeightInches / count);

  return Array.from({ length: count }, (_, index) => ({
    id: createStripeId(),
    color: palette[index % palette.length],
    widthInches,
  }));
}

export function roundToQuarter(value: number): number {
  return Math.round(value * 4) / 4;
}

export function normalizeStripes(
  stripes: Stripe[],
  canvasHeightInches: number
): Stripe[] {
  if (stripes.length === 0) {
    return createDefaultStripes(canvasHeightInches);
  }

  const total = stripes.reduce((sum, stripe) => sum + stripe.widthInches, 0);
  if (total <= 0) {
    const evenWidth = roundToQuarter(canvasHeightInches / stripes.length);
    return stripes.map((stripe) => ({ ...stripe, widthInches: evenWidth }));
  }

  if (Math.abs(total - canvasHeightInches) < 0.001) {
    return stripes;
  }

  const scale = canvasHeightInches / total;
  const scaled = stripes.map((stripe) => ({
    ...stripe,
    widthInches: Math.max(
      MIN_STRIPE_WIDTH,
      roundToQuarter(stripe.widthInches * scale)
    ),
  }));

  return fixStripeTotal(scaled, canvasHeightInches);
}

function fixStripeTotal(
  stripes: Stripe[],
  canvasHeightInches: number
): Stripe[] {
  if (stripes.length === 0) return stripes;

  const result = stripes.map((stripe) => ({ ...stripe }));
  const total = result.reduce((sum, stripe) => sum + stripe.widthInches, 0);
  const delta = roundToQuarter(canvasHeightInches - total);

  if (Math.abs(delta) < 0.001) {
    return result;
  }

  const lastIndex = result.length - 1;
  result[lastIndex] = {
    ...result[lastIndex],
    widthInches: Math.max(
      MIN_STRIPE_WIDTH,
      roundToQuarter(result[lastIndex].widthInches + delta)
    ),
  };

  return result;
}

export function scaleStripesForCanvas(
  stripes: Stripe[],
  oldHeight: number,
  newHeight: number
): Stripe[] {
  if (stripes.length === 0 || oldHeight <= 0) {
    return createDefaultStripes(newHeight);
  }

  const scale = newHeight / oldHeight;
  const scaled = stripes.map((stripe) => ({
    ...stripe,
    widthInches: Math.max(
      MIN_STRIPE_WIDTH,
      roundToQuarter(stripe.widthInches * scale)
    ),
  }));

  return normalizeStripes(scaled, newHeight);
}

export function paintStripeColor(
  stripes: Stripe[],
  stripeId: string,
  color: string
): Stripe[] {
  return stripes.map((stripe) =>
    stripe.id === stripeId ? { ...stripe, color } : stripe
  );
}

export function insertStripeBetween(
  stripes: Stripe[],
  insertIndex: number,
  color: string,
  requestedWidth: number,
  canvasHeightInches: number
): Stripe[] {
  const width = roundToQuarter(Math.max(MIN_STRIPE_WIDTH, requestedWidth));

  if (stripes.length === 0) {
    return normalizeStripes(
      [
        {
          id: createStripeId(),
          color,
          widthInches: Math.min(width, canvasHeightInches),
        },
      ],
      canvasHeightInches
    );
  }

  const copy = stripes.map((stripe) => ({ ...stripe }));

  if (insertIndex <= 0) {
    return insertAtEdge(copy, "start", color, width, canvasHeightInches);
  }

  if (insertIndex >= copy.length) {
    return insertAtEdge(copy, "end", color, width, canvasHeightInches);
  }

  const above = copy[insertIndex - 1];
  const below = copy[insertIndex];
  let fromAbove = roundToQuarter(width / 2);
  let fromBelow = width - fromAbove;

  const maxFromAbove = above.widthInches - MIN_STRIPE_WIDTH;
  const maxFromBelow = below.widthInches - MIN_STRIPE_WIDTH;

  if (fromAbove > maxFromAbove) {
    fromBelow += fromAbove - maxFromAbove;
    fromAbove = maxFromAbove;
  }
  if (fromBelow > maxFromBelow) {
    fromAbove += fromBelow - maxFromBelow;
    fromBelow = maxFromBelow;
  }

  const actualWidth = roundToQuarter(fromAbove + fromBelow);
  if (actualWidth < MIN_STRIPE_WIDTH) {
    return stripes;
  }

  const newStripe: Stripe = {
    id: createStripeId(),
    color,
    widthInches: actualWidth,
  };

  copy[insertIndex - 1] = {
    ...above,
    widthInches: roundToQuarter(above.widthInches - fromAbove),
  };
  copy[insertIndex] = {
    ...below,
    widthInches: roundToQuarter(below.widthInches - fromBelow),
  };

  const next = [
    ...copy.slice(0, insertIndex),
    newStripe,
    ...copy.slice(insertIndex),
  ];

  return normalizeStripes(next, canvasHeightInches);
}

function insertAtEdge(
  stripes: Stripe[],
  edge: "start" | "end",
  color: string,
  requestedWidth: number,
  canvasHeightInches: number
): Stripe[] {
  const donorIndex = edge === "start" ? 0 : stripes.length - 1;
  const donor = stripes[donorIndex];
  const maxInsert = roundToQuarter(donor.widthInches - MIN_STRIPE_WIDTH);

  if (maxInsert < MIN_STRIPE_WIDTH) {
    return stripes;
  }

  const actualWidth = roundToQuarter(Math.min(requestedWidth, maxInsert));
  const newStripe: Stripe = {
    id: createStripeId(),
    color,
    widthInches: actualWidth,
  };

  stripes[donorIndex] = {
    ...donor,
    widthInches: roundToQuarter(donor.widthInches - actualWidth),
  };

  const next =
    edge === "start"
      ? [newStripe, ...stripes]
      : [...stripes, newStripe];

  return normalizeStripes(next, canvasHeightInches);
}

export const STRIPE_WIDTH_PRESETS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3] as const;

export const CONSTRAINT_MESSAGE =
  "This color combination may reduce pattern clarity on this loom setup.";

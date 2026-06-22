import type { Stripe } from "@/types/stripe-editor";

export const GRID_STEP_INCHES = 0.25;
const MIN_STRIPE_WIDTH = GRID_STEP_INCHES;

let stripeCounter = 0;

export function createStripeId(): string {
  stripeCounter += 1;
  return `stripe-${stripeCounter}`;
}

export function roundToQuarter(value: number): number {
  return Math.round(value * 4) / 4;
}

export function snapToGrid(inches: number): number {
  return roundToQuarter(Math.max(0, inches));
}

function stripeEnd(stripe: Pick<Stripe, "startInches" | "widthInches">): number {
  return stripe.startInches + stripe.widthInches;
}

export function overlaps(
  a: Pick<Stripe, "startInches" | "widthInches">,
  b: Pick<Stripe, "startInches" | "widthInches">
): boolean {
  return a.startInches < stripeEnd(b) && b.startInches < stripeEnd(a);
}

export function canPlaceStripe(
  stripes: Stripe[],
  candidate: Pick<Stripe, "id" | "startInches" | "widthInches">,
  canvasHeightInches: number,
  excludeId?: string
): boolean {
  if (candidate.startInches < 0) return false;
  if (stripeEnd(candidate) > canvasHeightInches + 0.001) return false;

  for (const stripe of stripes) {
    if (stripe.id === excludeId) continue;
    if (overlaps(candidate, stripe)) return false;
  }

  return true;
}

export function getStripeAt(
  stripes: Stripe[],
  inches: number
): Stripe | undefined {
  for (let index = stripes.length - 1; index >= 0; index -= 1) {
    const stripe = stripes[index];
    if (
      inches >= stripe.startInches &&
      inches < stripe.startInches + stripe.widthInches
    ) {
      return stripe;
    }
  }

  return undefined;
}

export function placeStripeAt(
  stripes: Stripe[],
  startInches: number,
  color: string,
  requestedWidth: number,
  canvasHeightInches: number
): Stripe[] {
  const widthInches = roundToQuarter(Math.max(MIN_STRIPE_WIDTH, requestedWidth));
  const candidate: Stripe = {
    id: createStripeId(),
    color,
    startInches: snapToGrid(startInches),
    widthInches,
  };

  if (!canPlaceStripe(stripes, candidate, canvasHeightInches)) {
    return stripes;
  }

  return [...stripes, candidate];
}

export function paintStripe(
  stripes: Stripe[],
  stripeId: string,
  color: string,
  requestedWidth: number,
  canvasHeightInches: number
): Stripe[] {
  const index = stripes.findIndex((stripe) => stripe.id === stripeId);
  if (index === -1) return stripes;

  const widthInches = roundToQuarter(Math.max(MIN_STRIPE_WIDTH, requestedWidth));
  const updated: Stripe = {
    ...stripes[index],
    color,
    widthInches,
  };

  if (!canPlaceStripe(stripes, updated, canvasHeightInches, stripeId)) {
    return stripes;
  }

  return stripes.map((stripe) => (stripe.id === stripeId ? updated : stripe));
}

export function scaleStripesForCanvas(
  stripes: Stripe[],
  oldHeight: number,
  newHeight: number
): Stripe[] {
  if (stripes.length === 0 || oldHeight <= 0) return [];

  const scale = newHeight / oldHeight;

  return stripes
    .map((stripe) => ({
      ...stripe,
      startInches: roundToQuarter(stripe.startInches * scale),
      widthInches: Math.max(
        MIN_STRIPE_WIDTH,
        roundToQuarter(stripe.widthInches * scale)
      ),
    }))
    .filter((stripe) => stripeEnd(stripe) <= newHeight + 0.001);
}

export function layoutStripeHeights(
  stripes: Stripe[],
  canvasHeightInches: number,
  previewHeight: number
): { stripe: Stripe; y: number; height: number }[] {
  const pixelsPerInch = previewHeight / canvasHeightInches;

  return stripes.map((stripe) => ({
    stripe,
    y: stripe.startInches * pixelsPerInch,
    height: stripe.widthInches * pixelsPerInch,
  }));
}

export function inchesFromPreviewY(
  clickY: number,
  previewHeight: number,
  canvasHeightInches: number
): number {
  return (clickY / previewHeight) * canvasHeightInches;
}

export const STRIPE_WIDTH_PRESETS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3] as const;

export const CONSTRAINT_MESSAGE =
  "This color combination may reduce pattern clarity on this loom setup.";

export const PLACEMENT_WARNING =
  "Not enough space at this position.";

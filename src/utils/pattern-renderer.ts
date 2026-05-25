import type { ResolvedStripeLayer } from "@/types";

export interface PreviewBand {
  y: number;
  height: number;
  color: string;
  layerType: ResolvedStripeLayer["type"];
}

export interface PreviewSection {
  bands: PreviewBand[];
  height: number;
}

const PREVIEW_WIDTH = 320;

export function layersToPreviewSections(
  layers: ResolvedStripeLayer[],
  options?: {
    topRepeats?: number;
    bottomRepeats?: number;
    splitRatio?: number;
  }
): {
  width: number;
  top: PreviewSection;
  bottom: PreviewSection;
  totalHeight: number;
} {
  const topRepeats = options?.topRepeats ?? 3;
  const bottomRepeats = options?.bottomRepeats ?? 1;
  const splitRatio = options?.splitRatio ?? 0.72;

  const unitHeight = layers.reduce(
    (sum, l) => sum + l.heightInches * l.repeat,
    0
  );
  const pixelsPerInch = 48 / unitHeight;

  function buildSection(repeats: number): PreviewSection {
    const bands: PreviewBand[] = [];
    let y = 0;
    for (let r = 0; r < repeats; r++) {
      for (const layer of layers) {
        const h = layer.heightInches * pixelsPerInch;
        bands.push({
          y,
          height: h,
          color: layer.color,
          layerType: layer.type,
        });
        y += h;
      }
    }
    return { bands, height: y };
  }

  const top = buildSection(topRepeats);
  const bottom = buildSection(bottomRepeats);
  const targetTotal = 280;
  const topTarget = targetTotal * splitRatio;
  const bottomTarget = targetTotal - topTarget;

  const scaleSection = (
    section: PreviewSection,
    target: number
  ): PreviewSection => {
    const factor = target / section.height;
    let y = 0;
    const bands = section.bands.map((b) => {
      const height = b.height * factor;
      const band = { ...b, y, height };
      y += height;
      return band;
    });
    return { bands, height: y };
  };

  const scaledTop = scaleSection(top, topTarget);
  const scaledBottom = scaleSection(bottom, bottomTarget);

  return {
    width: PREVIEW_WIDTH,
    top: scaledTop,
    bottom: scaledBottom,
    totalHeight: scaledTop.height + scaledBottom.height,
  };
}


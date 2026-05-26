import { defaultLoomWidth } from "@/data/loom-profiles";
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

export const PREVIEW_WIDTH = 320;
export const PREVIEW_HEIGHT = 280;
const PREVIEW_TOP_HEIGHT = Math.round(PREVIEW_HEIGHT * 0.72);

export function getPreviewWidthForLoom(loomWidth: number): number {
  return Math.round(PREVIEW_WIDTH * (loomWidth / defaultLoomWidth));
}

export function layersToPreviewSections(
  layers: ResolvedStripeLayer[],
  options?: {
    loomWidth?: number;
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
  const previewWidth = getPreviewWidthForLoom(options?.loomWidth ?? defaultLoomWidth);
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
  const topTarget =
    splitRatio === 0.72 ? PREVIEW_TOP_HEIGHT : PREVIEW_HEIGHT * splitRatio;
  const bottomTarget = PREVIEW_HEIGHT - topTarget;

  const scaleSection = (
    section: PreviewSection,
    target: number
  ): PreviewSection => {
    if (section.height === 0) {
      return { bands: [], height: target };
    }
    const factor = target / section.height;
    let y = 0;
    const bands = section.bands.map((b, index) => {
      const isLast = index === section.bands.length - 1;
      const height = isLast
        ? target - y
        : Math.round(b.height * factor * 100) / 100;
      const band = { ...b, y, height };
      y += height;
      return band;
    });
    return { bands, height: target };
  };

  const scaledTop = scaleSection(top, topTarget);
  const scaledBottom = scaleSection(bottom, bottomTarget);

  return {
    width: previewWidth,
    top: scaledTop,
    bottom: scaledBottom,
    totalHeight: PREVIEW_HEIGHT,
  };
}


import { getTemplateById } from "@/data/templates";
import type {
  ColorRole,
  CustomizationState,
  GeneratedSpec,
  ResolvedStripeLayer,
} from "@/types";

const borderFallback = "#2a2622";
const neutralFallback = "#8b8680";

export function resolveColor(
  role: ColorRole,
  colors: CustomizationState["colors"]
): string {
  if (role === "border") return borderFallback;
  if (role === "neutral") return neutralFallback;
  if (role in colors) return colors[role as keyof typeof colors];
  return colors.base;
}

export function generateSpec(state: CustomizationState): GeneratedSpec | null {
  const template = getTemplateById(state.templateId);
  if (!template) return null;

  const stripeLayers: ResolvedStripeLayer[] = template.layers.map(
    (layer) => {
      const repeat = layer.repeat ?? 1;
      const picks = Math.round(layer.heightInches * template.ppi * repeat);
      return {
        type: layer.type,
        colorRole: layer.colorRole,
        heightInches: layer.heightInches,
        picks,
        color: resolveColor(layer.colorRole, state.colors),
        repeat,
      };
    }
  );

  const totalPicks = stripeLayers.reduce((sum, l) => sum + l.picks, 0);

  return {
    templateName: template.name,
    loomWidth: state.loomWidth,
    canvasHeightInches: state.canvasHeightInches,
    ppi: template.ppi,
    stripeLayers,
    totalPicks,
    colors: {
      base: state.colors.base,
      primary: state.colors.primary,
      accent: state.colors.accent,
    },
  };
}

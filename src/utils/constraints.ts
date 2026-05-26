import { getTemplateById } from "@/data/templates";
import type { ConstraintWarning, CustomizationState } from "@/types";
import { contrastRatio } from "./contrast";

export function evaluateConstraints(
  state: CustomizationState
): ConstraintWarning[] {
  const warnings: ConstraintWarning[] = [];
  const template = getTemplateById(state.templateId);
  if (!template) return warnings;

  if (state.loomWidth !== template.recommendedWidth) {
    warnings.push({
      id: "loom-width",
      severity: "warning",
      title: "Loom width differs from recommendation",
      message: `This pattern is drafted for ${template.recommendedWidth}″. At ${state.loomWidth}″ the cooperative may adjust selvedge or repeat.`,
    });
  }

  if (contrastRatio(state.colors.base, state.colors.primary) < 1.8) {
    warnings.push({
      id: "low-contrast",
      severity: "warning",
      title: "Low contrast between stripes",
      message:
        "Base and stripe colors are very close. Stripes may read softly on the loom — consider more separation.",
    });
  }

  const uniqueColors = new Set(Object.values(state.colors)).size;
  if (uniqueColors >= 3) {
    warnings.push({
      id: "color-count",
      severity: "info",
      title: "Multiple yarn changes",
      message:
        "Several distinct colors are in play. Extra yarn changes can extend setup — confirm with the weaving team.",
    });
  }

  return warnings;
}

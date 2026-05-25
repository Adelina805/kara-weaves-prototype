import type { TextileTemplate } from "@/types";

export const textileTemplates: TextileTemplate[] = [
  {
    id: "simple-stripe",
    name: "Simple Stripe",
    description: "Alternating base and primary rhythm",
    category: "Towel",
    recommendedWidth: 36,
    ppi: 40,
    layers: [
      { type: "stripe", colorRole: "base", heightInches: 1 },
      { type: "stripe", colorRole: "primary", heightInches: 0.25 },
      { type: "stripe", colorRole: "base", heightInches: 1 },
      { type: "stripe", colorRole: "primary", heightInches: 0.25 },
    ],
  },
  {
    id: "border-stripe",
    name: "Border Stripe",
    description: "Framed border with centered field",
    category: "Towel",
    recommendedWidth: 36,
    ppi: 40,
    layers: [
      { type: "border", colorRole: "border", heightInches: 0.5 },
      { type: "stripe", colorRole: "base", heightInches: 0.75 },
      { type: "stripe", colorRole: "primary", heightInches: 0.2 },
      { type: "stripe", colorRole: "accent", heightInches: 0.1 },
      { type: "stripe", colorRole: "primary", heightInches: 0.2 },
      { type: "stripe", colorRole: "base", heightInches: 0.75 },
      { type: "border", colorRole: "border", heightInches: 0.5 },
    ],
  },
  {
    id: "wide-band",
    name: "Wide Band",
    description: "Bold primary bands with accent lines",
    category: "Textile",
    recommendedWidth: 48,
    ppi: 36,
    layers: [
      { type: "band", colorRole: "base", heightInches: 0.5 },
      { type: "band", colorRole: "primary", heightInches: 1.5 },
      { type: "stripe", colorRole: "accent", heightInches: 0.15 },
      { type: "band", colorRole: "primary", heightInches: 1.5 },
      { type: "band", colorRole: "base", heightInches: 0.5 },
    ],
  },
  {
    id: "hospitality-stripe",
    name: "Hospitality Stripe",
    description: "Refined multi-stripe for linen programs",
    category: "Hospitality",
    recommendedWidth: 36,
    ppi: 42,
    layers: [
      { type: "stripe", colorRole: "base", heightInches: 0.6 },
      { type: "stripe", colorRole: "primary", heightInches: 0.15 },
      { type: "stripe", colorRole: "accent", heightInches: 0.08 },
      { type: "stripe", colorRole: "primary", heightInches: 0.15 },
      { type: "stripe", colorRole: "neutral", heightInches: 0.1 },
      { type: "stripe", colorRole: "primary", heightInches: 0.15 },
      { type: "stripe", colorRole: "accent", heightInches: 0.08 },
      { type: "stripe", colorRole: "base", heightInches: 0.6 },
    ],
  },
];

export function getTemplateById(id: string): TextileTemplate | undefined {
  return textileTemplates.find((t) => t.id === id);
}

export type StripeLayerType = "stripe" | "band" | "border";

export type ColorRole =
  | "base"
  | "primary"
  | "accent"
  | "border"
  | "neutral";

export interface StripeLayer {
  type: StripeLayerType;
  colorRole: ColorRole;
  heightInches: number;
  repeat?: number;
}

export interface TextileTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  recommendedWidth: number;
  ppi: number;
  layers: StripeLayer[];
  tags?: string[];
}

export interface LoomProfile {
  id: string;
  name: string;
  widthInches: number;
  maxColors: number;
  notes?: string;
}

export interface ConstraintWarning {
  id: string;
  severity: "info" | "warning";
  title: string;
  message: string;
}

export interface CustomizationState {
  templateId: string;
  loomWidth: number;
  colors: {
    base: string;
    primary: string;
    accent: string;
  };
  weaveThickness: string;
  textileCategory: string;
  fabricPreset: string;
}

export interface ResolvedStripeLayer {
  type: StripeLayerType;
  colorRole: ColorRole;
  heightInches: number;
  picks: number;
  color: string;
  repeat: number;
}

export interface GeneratedSpec {
  templateName: string;
  loomWidth: number;
  ppi: number;
  stripeLayers: ResolvedStripeLayer[];
  totalPicks: number;
  colors: Record<string, string>;
}

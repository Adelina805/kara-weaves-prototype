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

/** Finished-piece canvas preset (width × height in inches). */
export interface CanvasSizePreset {
  id: string;
  /** Display string for selects, e.g. 18″ × 28″ — Kitchen towel */
  label: string;
  widthInches: number;
  heightInches: number;
  maxColors: number;
  notes?: string;
}

export interface ConstraintWarning {
  id: string;
  severity: "info" | "warning";
  title: string;
  message: string;
}

export type EditableColorRole = "base" | "primary" | "accent";

export interface CustomizationState {
  templateId: string;
  /** Selected canvas preset id (`canvas-size-presets`). */
  canvasPresetId: string;
  /** Piece width in inches (warp / reed width); matches preset width. */
  loomWidth: number;
  /** Finished piece height in inches (length); matches preset height. */
  canvasHeightInches: number;
  colors: Record<EditableColorRole, string>;
  fabricOption: string;
}

export type YarnColor = {
  id: string;
  name: string;
  hex: string;
};

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
  canvasHeightInches: number;
  ppi: number;
  stripeLayers: ResolvedStripeLayer[];
  totalPicks: number;
  colors: Record<string, string>;
}

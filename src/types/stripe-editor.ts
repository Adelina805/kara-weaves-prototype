export type Stripe = {
  id: string;
  color: string;
  startInches: number;
  widthInches: number;
};

export type CanvasPreset = {
  id: string;
  widthInches: number;
  heightInches: number;
  fabricLabel: string;
  label: string;
};

export type StripeEditorState = {
  canvasPresetId: string;
  stripes: Stripe[];
  brushColor: string;
  brushWidth: number;
};

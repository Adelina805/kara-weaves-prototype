import type { EditableColorRole } from "@/types";

export type { EditableColorRole };

export const editableColorRoles: {
  key: EditableColorRole;
  label: string;
}[] = [
  { key: "base", label: "Base" },
  { key: "primary", label: "Stripe" },
  { key: "accent", label: "Accent" },
];

export function getColorRoleLabel(role: EditableColorRole): string {
  return editableColorRoles.find((r) => r.key === role)?.label ?? role;
}

"use client";

import { useMemo, useState } from "react";
import {
  defaultCanvasPresetId,
  getCanvasPresetById,
} from "@/data/canvas-size-presets";
import { defaultYarnSelections } from "@/data/yarn-colors";
import { defaultLoomWidth } from "@/data/loom-profiles";
import type { CustomizationState } from "@/types";
import { evaluateConstraints } from "@/utils/constraints";
import { generateSpec } from "@/utils/spec-generation";
import { AppLayout } from "@/components/AppLayout/AppLayout";
import { ControlsSidebar } from "@/components/ControlsSidebar/ControlsSidebar";
import { MainWorkspace } from "@/components/MainWorkspace/MainWorkspace";
import { SpecPanel } from "@/components/SpecPanel/SpecPanel";
import { TextilePreview } from "@/components/TextilePreview/TextilePreview";

const defaultCanvas = getCanvasPresetById(defaultCanvasPresetId);

const initialState: CustomizationState = {
  templateId: "simple-stripe",
  canvasPresetId: defaultCanvasPresetId,
  loomWidth: defaultCanvas?.widthInches ?? defaultLoomWidth,
  canvasHeightInches: defaultCanvas?.heightInches ?? defaultLoomWidth,
  colors: { ...defaultYarnSelections },
  fabricOption: "bath-towel",
};

export function CustomizationWorkspace() {
  const [state, setState] = useState<CustomizationState>(initialState);

  const spec = useMemo(() => generateSpec(state), [state]);
  const warnings = useMemo(() => evaluateConstraints(state), [state]);

  const resolvedLayers = spec?.stripeLayers ?? [];

  return (
    <AppLayout
      sidebar={
        <ControlsSidebar
          state={state}
          warnings={warnings}
          onTemplateChange={(templateId) => {
            setState((s) => ({ ...s, templateId }));
          }}
          onCanvasPresetChange={(presetId) => {
            const preset = getCanvasPresetById(presetId);
            if (!preset) return;
            setState((s) => ({
              ...s,
              canvasPresetId: preset.id,
              loomWidth: preset.widthInches,
              canvasHeightInches: preset.heightInches,
            }));
          }}
          onColorChange={(role, hex) =>
            setState((s) => ({
              ...s,
              colors: { ...s.colors, [role]: hex },
            }))
          }
          onFabricOptionChange={(fabricOption) =>
            setState((s) => ({ ...s, fabricOption }))
          }
        />
      }
    >
      <MainWorkspace
        preview={
          <TextilePreview
            layers={resolvedLayers}
            loomWidth={state.loomWidth}
            canvasHeightInches={state.canvasHeightInches}
          />
        }
        spec={<SpecPanel spec={spec} />}
      />
    </AppLayout>
  );
}

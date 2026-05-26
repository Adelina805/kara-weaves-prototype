"use client";

import { useMemo, useState } from "react";
import { defaultYarnSelections } from "@/data/yarn-colors";
import { defaultLoomWidth } from "@/data/loom-profiles";
import { getTemplateById } from "@/data/templates";
import type { CustomizationState } from "@/types";
import { evaluateConstraints } from "@/utils/constraints";
import { generateSpec } from "@/utils/spec-generation";
import { AppLayout } from "@/components/AppLayout/AppLayout";
import { ControlsSidebar } from "@/components/ControlsSidebar/ControlsSidebar";
import { MainWorkspace } from "@/components/MainWorkspace/MainWorkspace";
import { SpecPanel } from "@/components/SpecPanel/SpecPanel";
import { TextilePreview } from "@/components/TextilePreview/TextilePreview";

const initialState: CustomizationState = {
  templateId: "simple-stripe",
  loomWidth: defaultLoomWidth,
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
            const next = getTemplateById(templateId);
            setState((s) => ({
              ...s,
              templateId,
              loomWidth: next?.recommendedWidth ?? s.loomWidth,
            }));
          }}
          onLoomChange={(loomWidth) => setState((s) => ({ ...s, loomWidth }))}
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
          />
        }
        spec={<SpecPanel spec={spec} />}
      />
    </AppLayout>
  );
}

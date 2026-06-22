"use client";

import { useMemo, useState } from "react";
import {
  canvasPresetsP2,
  defaultCanvasPresetIdP2,
  getCanvasPresetP2,
} from "@/data/canvas-presets-p2";
import { defaultYarnSelections } from "@/data/yarn-colors";
import type { StripeEditorState } from "@/types/stripe-editor";
import {
  CONSTRAINT_MESSAGE,
  PLACEMENT_WARNING,
  paintStripe,
  placeStripeAt,
  scaleStripesForCanvas,
} from "@/utils/stripe-layout";
import { CanvasSelector } from "@/components/prototype-2/CanvasSelector/CanvasSelector";
import { ColorPalette } from "@/components/prototype-2/ColorPalette/ColorPalette";
import { SidebarSection } from "@/components/prototype-2/SidebarSection/SidebarSection";
import { StripeWidthControl } from "@/components/prototype-2/StripeWidthControl/StripeWidthControl";
import { TextilePreview } from "@/components/prototype-2/TextilePreview/TextilePreview";
import styles from "./DirectManipulationWorkspace.module.css";

const defaultCanvas = getCanvasPresetP2(defaultCanvasPresetIdP2)!;

const initialState: StripeEditorState = {
  canvasPresetId: defaultCanvasPresetIdP2,
  stripes: [],
  brushColor: defaultYarnSelections.primary,
  brushWidth: 1,
};

export function DirectManipulationWorkspace() {
  const [state, setState] = useState<StripeEditorState>(initialState);
  const [hoveredStripeId, setHoveredStripeId] = useState<string | null>(null);
  const [placementWarning, setPlacementWarning] = useState<string | null>(null);
  const canvas = useMemo(
    () => getCanvasPresetP2(state.canvasPresetId) ?? defaultCanvas,
    [state.canvasPresetId]
  );

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Design controls">
        <header className={styles.header}>
          <h1 className={styles.title}>Kara Weaves Design Workspace</h1>
          <p className={styles.subtitle}>Direct textile stripe customization</p>
        </header>

        <div className={styles.scroll}>
          <SidebarSection label="Canvas">
            <CanvasSelector
              presets={canvasPresetsP2}
              value={state.canvasPresetId}
              onChange={(presetId) => {
                const nextCanvas = getCanvasPresetP2(presetId);
                if (!nextCanvas) return;

                setState((current) => ({
                  ...current,
                  canvasPresetId: presetId,
                  stripes: scaleStripesForCanvas(
                    current.stripes,
                    canvas.heightInches,
                    nextCanvas.heightInches
                  ),
                }));
                setPlacementWarning(null);
              }}
            />
          </SidebarSection>

          <SidebarSection label="Palette">
            <ColorPalette
              selectedColor={state.brushColor}
              onColorChange={(brushColor) =>
                setState((current) => ({ ...current, brushColor }))
              }
            />
          </SidebarSection>

          <SidebarSection label="Stripe Width">
            <StripeWidthControl
              value={state.brushWidth}
              onChange={(brushWidth) => {
                setPlacementWarning(null);
                setState((current) => ({ ...current, brushWidth }));
              }}
            />
          </SidebarSection>

          <SidebarSection label="Constraints">
            <p className={styles.constraint}>{CONSTRAINT_MESSAGE}</p>
            {placementWarning && (
              <p className={styles.constraint} role="status">
                {placementWarning}
              </p>
            )}
          </SidebarSection>
        </div>
      </aside>

      <main className={styles.main}>
        <TextilePreview
          stripes={state.stripes}
          canvasWidthInches={canvas.widthInches}
          canvasHeightInches={canvas.heightInches}
          hoveredStripeId={hoveredStripeId}
          onStripeHover={setHoveredStripeId}
          onStripePaint={(stripeId) =>
            setState((current) => {
              const nextStripes = paintStripe(
                current.stripes,
                stripeId,
                current.brushColor,
                current.brushWidth,
                canvas.heightInches
              );

              if (nextStripes === current.stripes) {
                setPlacementWarning(PLACEMENT_WARNING);
                return current;
              }

              setPlacementWarning(null);
              return { ...current, stripes: nextStripes };
            })
          }
          onCanvasPlace={(startInches) =>
            setState((current) => {
              const nextStripes = placeStripeAt(
                current.stripes,
                startInches,
                current.brushColor,
                current.brushWidth,
                canvas.heightInches
              );

              if (nextStripes === current.stripes) {
                setPlacementWarning(PLACEMENT_WARNING);
                return current;
              }

              setPlacementWarning(null);
              return { ...current, stripes: nextStripes };
            })
          }
        />
      </main>
    </div>
  );
}

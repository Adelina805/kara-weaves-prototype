"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { editableColorRoles } from "@/data/color-roles";
import { getYarnColorByHex, karaWeavesYarnColors } from "@/data/yarn-colors";
import type { CustomizationState, EditableColorRole } from "@/types";
import { ColorSwatch } from "@/components/ColorSwatch/ColorSwatch";
import styles from "./ColorPalette.module.css";

type ColorPaletteProps = {
  colors: CustomizationState["colors"];
  onColorChange: (
    role: keyof CustomizationState["colors"],
    hex: string
  ) => void;
};

export function ColorPalette({ colors, onColorChange }: ColorPaletteProps) {
  const [activeRole, setActiveRole] = useState<EditableColorRole>("base");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const activeLabel =
    editableColorRoles.find((r) => r.key === activeRole)?.label ?? activeRole;

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth - clientWidth > 2;

    setFadeLeft(overflow && scrollLeft > 2);
    setFadeRight(overflow && scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateFades();

    el.addEventListener("scroll", updateFades, { passive: true });
    const observer = new ResizeObserver(updateFades);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateFades);
      observer.disconnect();
    };
  }, [updateFades, colors[activeRole]]);

  return (
    <div className={styles.builder} aria-label="Palette builder">
      <section
        className={styles.selectedSection}
        aria-label="Selected textile palette"
      >
        <ul className={styles.selectedList}>
          {editableColorRoles.map(({ key, label }) => {
            const hex = colors[key];
            const yarn = getYarnColorByHex(hex);
            const colorName = yarn?.name ?? "Custom";
            const isActive = activeRole === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  className={styles.selectedRow}
                  data-active={isActive || undefined}
                  aria-current={isActive ? "true" : undefined}
                  aria-pressed={isActive}
                  onClick={() => setActiveRole(key)}
                >
                  <span className={styles.roleLabel}>{label}</span>
                  <span
                    className={styles.selectedSwatch}
                    style={{ backgroundColor: hex }}
                    aria-hidden
                  />
                  <span className={styles.colorName}>{colorName}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        className={styles.availableSection}
        aria-label="Available yarn colors"
      >
        <div
          className={styles.strip}
          data-fade-left={fadeLeft || undefined}
          data-fade-right={fadeRight || undefined}
        >
          <div
            ref={scrollRef}
            className={styles.swatches}
            role="group"
            aria-label={`Yarn colors for ${activeLabel}`}
          >
            {karaWeavesYarnColors.map((yarn) => (
              <ColorSwatch
                key={yarn.id}
                hex={yarn.hex}
                label={`${activeLabel}: ${yarn.name}`}
                variant="picker"
                selected={colors[activeRole] === yarn.hex}
                onSelect={() => onColorChange(activeRole, yarn.hex)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

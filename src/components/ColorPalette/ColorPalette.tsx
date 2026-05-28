"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { editableColorRoles } from "@/data/color-roles";
import { getYarnColorByHex, karaWeavesYarnColors } from "@/data/yarn-colors";
import type { CustomizationState, EditableColorRole } from "@/types";
import { ColorSwatch } from "@/components/ColorSwatch/ColorSwatch";
import styles from "./ColorPalette.module.css";

const YARN_COLORS_SCROLL_ID = "yarn-colors-scroll";

type ColorPaletteProps = {
  colors: CustomizationState["colors"];
  onColorChange: (
    role: keyof CustomizationState["colors"],
    hex: string
  ) => void;
};

function scrollStrip(el: HTMLDivElement, direction: -1 | 1) {
  const step = Math.max(el.clientWidth * 0.85, 120);
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  el.scrollBy({
    left: direction * step,
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d={
          direction === "left"
            ? "M10 3L5 8l5 5"
            : "M6 3l5 5-5 5"
        }
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ColorPalette({ colors, onColorChange }: ColorPaletteProps) {
  const [activeRole, setActiveRole] = useState<EditableColorRole>("base");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const activeLabel =
    editableColorRoles.find((r) => r.key === activeRole)?.label ?? activeRole;
  const activeRoleHex = colors[activeRole];

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth - clientWidth > 2;

    setHasOverflow(overflow);
    setCanScrollLeft(overflow && scrollLeft > 2);
    setCanScrollRight(
      overflow && scrollLeft < scrollWidth - clientWidth - 2
    );
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = 0;
    updateScrollState();
  }, [activeRole, updateScrollState]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      el.removeEventListener("wheel", onWheel);
      observer.disconnect();
    };
  }, [updateScrollState, activeRoleHex]);

  const handleScrollClick = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    scrollStrip(el, direction);
  };

  const handleSwatchesKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.target !== scrollRef.current) return;

    const el = scrollRef.current;
    if (!el || !hasOverflow) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        scrollStrip(el, -1);
        break;
      case "ArrowRight":
        e.preventDefault();
        scrollStrip(el, 1);
        break;
      case "Home":
        e.preventDefault();
        el.scrollLeft = 0;
        break;
      case "End":
        e.preventDefault();
        el.scrollLeft = el.scrollWidth - el.clientWidth;
        break;
      default:
        break;
    }
  };

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
        <div className={styles.strip}>
          {hasOverflow && canScrollLeft && (
            <button
              type="button"
              className={styles.scrollBtn}
              data-side="left"
              aria-label={`Show earlier yarn colors for ${activeLabel}`}
              aria-controls={YARN_COLORS_SCROLL_ID}
              onClick={() => handleScrollClick(-1)}
            >
              <ChevronIcon direction="left" />
            </button>
          )}

          <div
            ref={scrollRef}
            id={YARN_COLORS_SCROLL_ID}
            className={styles.swatches}
            role="group"
            aria-label={`Yarn colors for ${activeLabel}`}
            tabIndex={hasOverflow ? 0 : undefined}
            onKeyDown={handleSwatchesKeyDown}
          >
            {hasOverflow && (
              <span className={styles.scrollHint}>
                Use arrow buttons or arrow keys to see more colors.
              </span>
            )}
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

          {hasOverflow && canScrollRight && (
            <button
              type="button"
              className={styles.scrollBtn}
              data-side="right"
              aria-label={`Show more yarn colors for ${activeLabel}`}
              aria-controls={YARN_COLORS_SCROLL_ID}
              onClick={() => handleScrollClick(1)}
            >
              <ChevronIcon direction="right" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

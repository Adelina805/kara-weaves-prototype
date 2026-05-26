"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { YarnColor } from "@/types";
import { getYarnColorByHex } from "@/data/yarn-colors";
import { ColorSwatch } from "@/components/ColorSwatch/ColorSwatch";
import styles from "./ColorRow.module.css";

type ColorRowProps = {
  label: string;
  selectedHex: string;
  yarns: YarnColor[];
  onSelect: (hex: string) => void;
};

export function ColorRow({
  label,
  selectedHex,
  yarns,
  onSelect,
}: ColorRowProps) {
  const groupId = `color-row-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const selectedYarn = getYarnColorByHex(selectedHex);
  const selectedName = selectedYarn?.name ?? "Custom";

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
  }, [updateFades, yarns.length, selectedHex]);

  return (
    <div className={styles.row}>
      <div className={styles.header}>
        <span className={styles.label} id={groupId}>
          {label}
        </span>
        <span className={styles.selectedName} aria-live="polite">
          {selectedName}
        </span>
      </div>

      <div
        className={styles.strip}
        data-fade-left={fadeLeft || undefined}
        data-fade-right={fadeRight || undefined}
      >
        <div
          ref={scrollRef}
          className={styles.swatches}
          role="group"
          aria-labelledby={groupId}
        >
          {yarns.map((yarn) => (
            <ColorSwatch
              key={yarn.id}
              hex={yarn.hex}
              label={`${label}: ${yarn.name}`}
              variant="row"
              selected={selectedHex === yarn.hex}
              onSelect={() => onSelect(yarn.hex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "./SidebarSection.module.css";

type SidebarSectionProps = {
  label: string;
  children: ReactNode;
};

export function SidebarSection({ label, children }: SidebarSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={`section-${label}`}>
      <h2 id={`section-${label}`} className={styles.label}>
        {label}
      </h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

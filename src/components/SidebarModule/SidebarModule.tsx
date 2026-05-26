import type { ReactNode } from "react";
import styles from "./SidebarModule.module.css";

type SidebarModuleProps = {
  label: string;
  compact?: boolean;
  children: ReactNode;
};

export function SidebarModule({
  label,
  compact = false,
  children,
}: SidebarModuleProps) {
  return (
    <section
      className={styles.module}
      data-compact={compact || undefined}
      aria-labelledby={`module-${label}`}
    >
      <h2 id={`module-${label}`} className={styles.label}>
        {label}
      </h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

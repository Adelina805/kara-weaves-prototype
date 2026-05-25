import type { ReactNode } from "react";
import styles from "./SidebarModule.module.css";

type SidebarModuleProps = {
  label: string;
  children: ReactNode;
};

export function SidebarModule({ label, children }: SidebarModuleProps) {
  return (
    <section className={styles.module} aria-labelledby={`module-${label}`}>
      <h2 id={`module-${label}`} className={styles.label}>
        {label}
      </h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

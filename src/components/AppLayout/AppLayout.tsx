import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

type AppLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.sidebar}>{sidebar}</div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

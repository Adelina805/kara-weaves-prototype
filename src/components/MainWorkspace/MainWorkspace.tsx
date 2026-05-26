import type { ReactNode } from "react";
import styles from "./MainWorkspace.module.css";

type MainWorkspaceProps = {
  preview: ReactNode;
  spec: ReactNode;
};

export function MainWorkspace({ preview, spec }: MainWorkspaceProps) {
  return (
    <div className={styles.workspace}>
      <div className={styles.preview}>{preview}</div>
      <div className={styles.section}>{spec}</div>
      <section className={styles.placeholder} aria-hidden>
        <p className={styles.placeholderLabel}>Digital Passport</p>
        <p className={styles.placeholderText}>
          Provenance and certification output will appear here.
        </p>
      </section>
    </div>
  );
}

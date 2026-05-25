import type { ConstraintWarning } from "@/types";
import styles from "./WarningCallout.module.css";

type WarningCalloutProps = {
  warnings: ConstraintWarning[];
};

export function WarningCallout({ warnings }: WarningCalloutProps) {
  const primary = warnings[0];
  if (!primary) return null;

  return (
    <aside
      className={styles.callout}
      data-severity={primary.severity}
      aria-live="polite"
    >
      <p className={styles.title}>{primary.title}</p>
      <p className={styles.message}>{primary.message}</p>
      {warnings.length > 1 && (
        <p className={styles.more}>
          +{warnings.length - 1} additional note
          {warnings.length > 2 ? "s" : ""}
        </p>
      )}
    </aside>
  );
}

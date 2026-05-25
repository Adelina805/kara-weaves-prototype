import type { GeneratedSpec } from "@/types";
import styles from "./SpecPanel.module.css";

type SpecPanelProps = {
  spec: GeneratedSpec | null;
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function SpecPanel({ spec }: SpecPanelProps) {
  if (!spec) {
    return (
      <aside className={styles.panel} aria-label="Weaving specification">
        <p className={styles.empty}>Select a pattern to generate spec.</p>
      </aside>
    );
  }

  return (
    <aside className={styles.panel} aria-label="Weaving specification">
      <header className={styles.header}>
        <h2 className={styles.title}>Recipe</h2>
        <p className={styles.subtitle}>Generated from current settings</p>
      </header>

      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Pattern</h3>
        <dl className={styles.dl}>
          <SpecRow label="Template" value={spec.templateName} />
          <SpecRow label="Loom width" value={`${spec.loomWidth}″`} />
          <SpecRow label="PPI" value={String(spec.ppi)} />
          <SpecRow label="Total picks" value={String(spec.totalPicks)} />
        </dl>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Stripe layers</h3>
        <ul className={styles.layers}>
          {spec.stripeLayers.map((layer, i) => (
            <li key={i} className={styles.layerItem}>
              <span
                className={styles.swatch}
                style={{ backgroundColor: layer.color }}
                aria-hidden
              />
              <span className={styles.layerMeta}>
                <span className={styles.layerType}>{layer.type}</span>
                <span className={styles.layerDetail}>
                  {layer.colorRole} · {layer.heightInches}″ · {layer.picks}{" "}
                  picks
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Colors</h3>
        <dl className={styles.dl}>
          {Object.entries(spec.colors).map(([role, hex]) => (
            <div key={role} className={styles.colorRow}>
              <dt>{role}</dt>
              <dd>
                <span
                  className={styles.swatch}
                  style={{ backgroundColor: hex }}
                  aria-hidden
                />
                <code>{hex}</code>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </aside>
  );
}

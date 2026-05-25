import Link from "next/link";
import styles from "@/styles/page.module.css";

export const metadata = {
  title: "Prototype 1",
};

export default function Prototype1Page() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Prototype 1</p>
        <h1 className={styles.title}>Textile customization</h1>
        <p className={styles.lead}>
          Build guided customization, SVG textile previews, spec summaries, and
          soft constraint warnings here.
        </p>
      </header>

      <p className={styles.placeholder}>
        Placeholder route — add components in <code>src/components/</code>, data
        in <code>src/data/</code>, and types in <code>src/types/</code>.
      </p>

      <Link href="/" className={styles.back}>
        ← All prototypes
      </Link>
    </main>
  );
}

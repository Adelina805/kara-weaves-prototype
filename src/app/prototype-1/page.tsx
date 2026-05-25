import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import styles from "@/styles/page.module.css";

export const metadata = {
  title: "Prototype 1",
};

export default function Prototype1Page() {
  return (
    <main className={styles.shell}>
      <PageHeader title="Textile customization" />

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

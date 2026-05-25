import Link from "next/link";
import styles from "@/styles/page.module.css";

export const metadata = {
  title: "Prototype 2",
};

export default function Prototype2Page() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Prototype 2</p>
        <h1 className={styles.title}>Future experiments</h1>
        <p className={styles.lead}>
          Reserve this route for Digital Passport storytelling, admin workflows, or
          buyer-facing production pages.
        </p>
      </header>

      <p className={styles.placeholder}>
        Placeholder route — register new prototypes on the homepage when ready.
      </p>

      <Link href="/" className={styles.back}>
        ← All prototypes
      </Link>
    </main>
  );
}

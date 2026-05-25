import Link from "next/link";
import styles from "@/styles/page.module.css";

const prototypes = [
  {
    href: "/prototype-1",
    title: "Prototype 1",
    description: "Textile customization — template selection, live preview, spec generation.",
  },
  {
    href: "/prototype-2",
    title: "Prototype 2",
    description: "Reserved for future experiments — Digital Passport, admin flows, buyer pages.",
  },
] as const;

export default function HomePage() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Kara Weaves</p>
        <h1 className={styles.title}>Prototype Lab</h1>
        <p className={styles.lead}>
          Frontend foundation for guided textile customization, constraint-aware
          design, and specification previews.
        </p>
      </header>

      <nav aria-label="Prototypes">
        <ul className={styles.nav}>
          {prototypes.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.link}>
                <span className={styles.linkTitle}>{item.title}</span>
                <span className={styles.linkDesc}>{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

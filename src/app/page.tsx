import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
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
    description: "Direct stripe painting — choose color and width, then click the textile to edit.",
  },
] as const;

export default function HomePage() {
  return (
    <main className={styles.shell}>
      <PageHeader title="Kara Weaves — Prototype Lab" />

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

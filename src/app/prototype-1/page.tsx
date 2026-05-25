import Link from "next/link";
import { CustomizationWorkspace } from "@/components/CustomizationWorkspace/CustomizationWorkspace";
import styles from "./prototype-1.module.css";

export const metadata = {
  title: "Textile customization",
};

export default function Prototype1Page() {
  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <div>
          <h1 className={styles.heading}>Textile customization</h1>
          <p className={styles.context}>
            Guided pattern planning · constraint-aware preview
          </p>
        </div>
        <Link href="/" className={styles.back}>
          All prototypes
        </Link>
      </header>

      <div className={styles.main}>
        <CustomizationWorkspace />
      </div>
    </div>
  );
}

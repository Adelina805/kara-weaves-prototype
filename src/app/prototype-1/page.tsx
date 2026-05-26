import { CustomizationWorkspace } from "@/components/CustomizationWorkspace/CustomizationWorkspace";
import styles from "./prototype-1.module.css";

export const metadata = {
  title: "Textile customization",
};

export default function Prototype1Page() {
  return (
    <div className={styles.shell}>
      <div className={styles.main}>
        <CustomizationWorkspace />
      </div>
    </div>
  );
}

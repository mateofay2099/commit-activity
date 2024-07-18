import Image from "next/image";
import styles from "./Error.module.css";

export const Error = () => {
  return (
    <div className={styles.errorContainer}>
      <Image src="/errorIcon.svg" alt="Error Icon" width={100} height={100} />
      <h2>Something went wrong. Please try again later.</h2>
    </div>
  );
};

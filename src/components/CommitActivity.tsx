import { Error } from "@components/Common/Error";
import { getCommitActivity } from "@services/commitActivity";
import { ActivityGraph } from "./ActivityGraph/ActivityGraph";
import styles from "./CommitActivity.module.css";

export const CommitActivity = async () => {
  const { data, error } = await getCommitActivity();

  if (error || !data) {
    return <Error />;
  }

  return (
    <div className={styles.activityGraphContainer}>
      <ActivityGraph activity={data} />
      <div className={styles.colorsIndicator}>
        <p>Less</p>
        <span className={`commitCountColor-0 ${styles.color}`} />
        <span className={`commitCountColor-1 ${styles.color}`} />
        <span className={`commitCountColor-2 ${styles.color}`} />
        <span className={`commitCountColor-3 ${styles.color}`} />
        <span className={`commitCountColor-4 ${styles.color}`} />
        <p>More</p>
      </div>
    </div>
  );
};

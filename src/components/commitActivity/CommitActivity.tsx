import { DateActivity } from "@/types";
import { ActivityGraph } from "./ActivityGraph";
import { getCommitActivityByWeekDay } from "@utils";
import styles from "./CommitActivity.module.css";

type CommitActivityProps = {
  data: DateActivity[];
};

export const CommitActivity = ({ data }: CommitActivityProps) => {
  const commitActivityByWeekDay = getCommitActivityByWeekDay(data);

  return (
    <div className={styles.activityGraphContainer}>
      <ActivityGraph activity={commitActivityByWeekDay} />
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

import { DateActivity } from "@/types";
import { ActivityGraph } from "./ActivityGraph";
import { getCommitActivityByWeekDay } from "@utils";
import { ScrollIndicator } from "@components/common/ScrollIndicator";
import styles from "./CommitActivity.module.css";

type CommitActivityProps = {
  data: DateActivity[];
};

const activityGraphId = "commitActivityGraph";

export const CommitActivity = ({ data }: CommitActivityProps) => {
  const commitActivityByWeekDay = getCommitActivityByWeekDay(data);

  return (
    <div className={styles.activityGraphContainer}>
      <ActivityGraph activity={commitActivityByWeekDay} id={activityGraphId} />
      <div className={styles.bottomIndicatorsContainer}>
        <div className={styles.scrollIndicator}>
          <ScrollIndicator scrollableElementId={activityGraphId} />
        </div>
        <div className={styles.colorsIndicator}>
          <p>Less</p>
          <span className="commitCountColor-0" />
          <span className="commitCountColor-1" />
          <span className="commitCountColor-2" />
          <span className="commitCountColor-3" />
          <span className="commitCountColor-4" />
          <p>More</p>
        </div>
      </div>
    </div>
  );
};

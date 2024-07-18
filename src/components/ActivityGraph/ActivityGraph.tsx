import { CommitActivity, WEEK_DAYS } from "@/types";
import { GraphRow } from "./GraphRow";
import { Tooltip } from "@components/Common/Tooltip";
import { getMonthHeadersFromActivities } from "@utils";
import styles from "./ActivityGraph.module.css";

export const ActivityGraph = ({ activity }: { activity: CommitActivity }) => {
  const monthHeaders = getMonthHeadersFromActivities(
    activity[WEEK_DAYS.SUNDAY]
  );
  return (
    <>
      <Tooltip id="graphDataTooltip" />
      <div className={styles.activityGraph}>
        <table>
          <thead>
            <tr>
              <th />
              {monthHeaders.map(({ month, year, colSpan }) => (
                <th
                  key={`graphHeader-${month}-${year}`}
                  colSpan={colSpan}
                  className={styles.graphHeader}
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(activity).map(([day, data]) => (
              <GraphRow key={`graphRow-${day}`} weekDay={day} data={data} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

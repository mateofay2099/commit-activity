import { CommitActivityByWeekDay, WEEK_DAYS } from "@/types";
import { GraphRow } from "./GraphRow";
import { Tooltip } from "@components/common/Tooltip";
import { getActivityGraphHeaders } from "@utils";
import styles from "./ActivityGraph.module.css";

type ActivityGraphProps = {
  activity: CommitActivityByWeekDay;
  id: string;
};

export const ActivityGraph = ({ id, activity }: ActivityGraphProps) => {
  const monthHeaders = getActivityGraphHeaders(activity[WEEK_DAYS.SUNDAY]);
  return (
    <>
      <Tooltip id="graphDataTooltip" />
      <div className={styles.activityGraph} id={id}>
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

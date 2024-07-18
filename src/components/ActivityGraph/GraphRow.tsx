import { DateActivity } from "@/types";
import { getDisplayDate } from "@utils";
import styles from "./ActivityGraph.module.css";

const getTooltipText = (date: Date, commits: number) => {
  const parsedDate = getDisplayDate(date);
  return commits === 0
    ? `No commits on ${parsedDate}`
    : `${commits} commits on ${parsedDate}`;
};

interface GraphRowProps {
  data: DateActivity[];
  weekDay: string;
}

export const GraphRow = ({ data, weekDay }: GraphRowProps) => {
  return (
    <tr>
      <td className={styles.weekDay}>{weekDay}</td>
      {data.map(({ date, commits, colorIndex }) => (
        <td
          key={`graphData-${date.toString()}`}
          className={`${styles.graphCell} commitCountColor-${colorIndex}`}
        >
          <a
            style={{
              display: "block",
            }}
            data-tooltip-id="graphDataTooltip"
            data-tooltip-content={getTooltipText(date, commits)}
          />
        </td>
      ))}
    </tr>
  );
};

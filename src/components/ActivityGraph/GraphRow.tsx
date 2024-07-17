import { DateActivity } from "@/types";
import styles from "./ActivityGraph.module.css";

export const GraphRow = ({ data }: { data: DateActivity[] }) => {
  return (
    <tr>
      {data.map(({ date, commits, colorIndex }) => (
        <td
          key={`graphData-${date.toString()}`}
          className={`${styles.graphCell} commitCountColor-${colorIndex}`}
        />
      ))}
    </tr>
  );
};

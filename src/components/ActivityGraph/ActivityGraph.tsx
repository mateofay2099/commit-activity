import { CommitActivity, WEEK_DAYS } from "@/types";
import { GraphRow } from "./GraphRow";

export const ActivityGraph = ({ data }: { data: CommitActivity }) => {
  return (
    <table>
      <tbody>
        <GraphRow data={data[WEEK_DAYS.SUNDAY]} />
        <GraphRow data={data[WEEK_DAYS.MONDAY]} />
        <GraphRow data={data[WEEK_DAYS.TUESDAY]} />
        <GraphRow data={data[WEEK_DAYS.WEDNESDAY]} />
        <GraphRow data={data[WEEK_DAYS.THURSDAY]} />
        <GraphRow data={data[WEEK_DAYS.FRIDAY]} />
        <GraphRow data={data[WEEK_DAYS.SATURDAY]} />
      </tbody>
    </table>
  );
};

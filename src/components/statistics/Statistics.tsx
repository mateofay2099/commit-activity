import { DateActivity } from "@/types";
import { CommitsPerMonthChart } from "@components/statistics/CommitsPerMonthChart";
import {
  getCommitsPerMonthChartData,
  getCommitsPerWeekDayChartData,
} from "@utils";
import { CommitsPerWeekDayChart } from "./CommitsPerWeekDayChart";
import styles from "./Statistics.module.css";

type StatisticsProps = {
  data: DateActivity[];
};

export const Statistics = ({ data }: StatisticsProps) => {
  const { months, values: monthValues } = getCommitsPerMonthChartData(data);
  const { weekDays, values: weekDaysValues } =
    getCommitsPerWeekDayChartData(data);

  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.chartsContainer}>
        <CommitsPerMonthChart months={months} values={monthValues} />
        <CommitsPerWeekDayChart weekDays={weekDays} values={weekDaysValues} />
      </div>
    </div>
  );
};

"use client";
import { Bar } from "react-chartjs-2";
import styles from "./Statistics.module.css";
import "chart.js/auto";

type CommitsPerWeekDayChartProps = {
  weekDays: string[];
  values: number[];
};

export const CommitsPerWeekDayChart = ({
  weekDays,
  values,
}: CommitsPerWeekDayChartProps) => {
  return (
    <div className={styles.statisticChart}>
      <Bar
        data={{
          labels: weekDays,
          datasets: [
            {
              label: "Commits per week day",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        style={{ height: "30rem", width: "100%" }}
        options={{ maintainAspectRatio: false, responsive: true }}
      />
    </div>
  );
};

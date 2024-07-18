"use client";
import { Line } from "react-chartjs-2";
import styles from "./Statistics.module.css";
import "chart.js/auto";

type CommitsPerMonthChartProps = {
  months: string[];
  values: number[];
};

export const CommitsPerMonthChart = ({
  months,
  values,
}: CommitsPerMonthChartProps) => {
  return (
    <div className={styles.statisticChart}>
      <Line
        data={{
          labels: months,
          datasets: [
            {
              label: "Commits per month",
              data: values,
              backgroundColor: ["#1dcfcf44"],
              borderColor: ["#1dcfcf"],
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

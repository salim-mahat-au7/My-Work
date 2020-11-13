import React from "react";
import { Doughnut } from "react-chartjs-2";

const DonutChart = () => {
  return (
    <>
      <div>
        <Doughnut
          data={{
            labels: ["Mutual Funds", "ETFs"],
            datasets: [
              {
                label: "number",
                data: [70, 30],
                backgroundColor: ["aqua", "orange"],
                borderWidth: 2,
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </>
  );
};

export default DonutChart;

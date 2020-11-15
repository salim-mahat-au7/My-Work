import React from "react";
import { Doughnut } from "react-chartjs-2";

const Chart = () => {
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
                backgroundColor: ["aqua", "goldenrod"],
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

export default Chart;

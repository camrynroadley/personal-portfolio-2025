import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
  import { valueFormatter } from "../sections/bento/work/webUsageStats";
import type { Responsibility } from "../types/app";

interface PieAnimationProps {
  responsibilities: Responsibility[];
}

interface CustomLegendProps {
  responsibilities: Responsibility[];
}

const colors = ["#FE7FA2", "#F9E8F9", "#FFC399", "#F2FF9C", "#D5D15D"];

export default function PieAnimation({ responsibilities }: PieAnimationProps) {
  return (
    <Box sx={{ width: "100%", overflow: "visible" }}>
      <PieChart
        colors={colors}
        height={300}
        width={300}
        hideLegend
        series={[
          {
            data: responsibilities.slice(0, 5),
            innerRadius: 50,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        slotProps={{
          pieArc: {
            style: {
              stroke: "none",
            },
          },
        }}
      />
    </Box>
  );
}

export function CustomLegend({ responsibilities }: CustomLegendProps) {
  const maxRows = 3;
  const columns: Responsibility[][] = [];

  for (let i = 0; i < responsibilities.length; i += maxRows) {
    columns.push(responsibilities.slice(i, i + maxRows));
  }

  return (
    <div className="flex gap-x-6">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col space-y-1">
          {col.map((entry, i) => (
            <div key={entry.label} className="flex items-center space-x-2">
              <div
                style={{
                  backgroundColor: colors[colIndex * maxRows + i],
                  width: 12,
                  height: 12,
                }}
              />
              <span className="text-sm">{entry.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

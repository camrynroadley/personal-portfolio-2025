import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  valueFormatter,
} from "../sections/work/webUsageStats";
import type { Responsibility } from "../types/app";

interface PieAnimationProps {
  responsibilities: Responsibility[];
}

interface CustomLegendProps {
  responsibilities: Responsibility[];
}

const colors = ["#FE7FA2", "#FF9A52", "#B56178", "#FAFFDD", "#D5D15D"];

export default function PieAnimation({ responsibilities }: PieAnimationProps) {
  return (
    <Box sx={{ width: "100%" }}>
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
  return (
    <div className="flex flex-col space-y-1">
      {responsibilities.map((entry, i) => (
        <div key={entry.label} className="flex items-center space-x-1">
          <div style={{ backgroundColor: colors[i], width: 12, height: 12 }} />
          <span>{entry.label}</span>
        </div>
      ))}
    </div>
  );
}
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import type { Responsibility } from "../types/app";
import { colors } from "../constants";

interface PieAnimationProps {
  responsibilities: Responsibility[];
}

interface CustomLegendProps {
  responsibilities: Responsibility[];
}

const pieChartColors = [colors.PINK, colors.LAVENDER, colors.ORANGE, colors.LIGHT_GREEN, colors.DARK_GREEN];

export const PieAnimation = ({ responsibilities }: PieAnimationProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        mx: "auto",
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PieChart
        colors={pieChartColors}
        hideLegend
        series={[
          {
            data: responsibilities.slice(0, 5),
            innerRadius: 30,
            highlightScope: { fade: "global", highlight: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
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

export const CustomLegend = ({ responsibilities }: CustomLegendProps) => {
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
                  backgroundColor: pieChartColors[colIndex * maxRows + i],
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

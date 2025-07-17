import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { useMediaQuery } from "@mui/material";
import type { Responsibility } from "../types/app";
import { colors } from "../constants";

interface PieAnimationProps {
  responsibilities: Responsibility[];
}

interface CustomLegendProps {
  responsibilities: Responsibility[];
}

const pieChartColors = [
  colors.PINK,
  colors.LAVENDER,
  colors.ORANGE,
  colors.LIGHT_GREEN,
  colors.DARK_GREEN,
];

export const PieAnimation = ({ responsibilities }: PieAnimationProps) => {
  return (
    <Box
      role="img"
      aria-label="Pie chart visualizing key responsibilities"
      data-testid="pie-chart"
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
};

export const CustomLegend = ({ responsibilities }: CustomLegendProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const maxRows = 3;

  const columns: Responsibility[][] = [];

  if (isSmallScreen) {
    columns.push(responsibilities);
  } else {
    for (let i = 0; i < responsibilities.length; i += maxRows) {
      columns.push(responsibilities.slice(i, i + maxRows));
    }
  }

  return (
    <div
      className={`flex ${isSmallScreen ? "flex-col" : "flex-row"} gap-y-0 sm:gap-x-6`}
      role="list"
      aria-label="Responsibility legend"
      data-testid="pie-legend"
    >
      {columns.map((col, colIndex) => (
        <ul key={colIndex} className="flex flex-col space-y-1" role="list">
          {col.map((entry, i) => {
            const color = pieChartColors[colIndex * maxRows + i] || "#ccc";
            return (
              <li
                key={entry.label}
                className="flex items-center space-x-2"
                role="listitem"
              >
                <span
                  className="rounded-full inline-block"
                  aria-hidden="true"
                  style={{
                    backgroundColor: color,
                    width: 12,
                    height: 12,
                  }}
                />
                <span className="text-sm">{entry.label}</span>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

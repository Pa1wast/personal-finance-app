"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { convertToCurrency } from "../lib/helpers";

export const description = "A donut chart with text";

export function BudgetChart({ chartData }) {
  const chartConfig = chartData.reduce((acc, { category, theme }) => {
    acc[category] = { label: category, color: theme };
    return acc;
  }, {} as ChartConfig);

  const totalMaximum = React.useMemo(() => {
    return chartData.reduce(
      (acc: number, curr: { maximum: number }) => acc + curr.maximum,
      0,
    );
  }, [chartData]);

  const totalBudgetSpent = chartData.reduce((acc, cur) => acc + cur.spent, 0);

  return (
    <Card className="flex-1">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="maximum"
              nameKey="category"
              innerRadius={60}
              strokeWidth={1}
            >
              {/* Map through the chartData to assign fill color to each Cell */}
              {chartData.map(
                (entry: { theme: string | undefined }, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.theme} />
                ),
              )}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {convertToCurrency(totalBudgetSpent)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          of {convertToCurrency(totalMaximum)} limit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

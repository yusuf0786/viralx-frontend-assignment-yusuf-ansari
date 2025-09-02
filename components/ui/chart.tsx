"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from "recharts";

// --- Chart Context and Config ---
type ChartConfigItem = {
  label?: React.ReactNode;
  icon?: React.ComponentType;
  color?: string;
};
export type ChartConfig = Record<string, ChartConfigItem>;

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

// --- Chart Container ---
export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className} data-chart={chartId} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  );
}

// --- Payload Type for Tooltip/Legend ---
interface CustomPayload {
  name?: string;
  value?: number | string;
  color?: string;
  [key: string]: unknown;
}

// --- Custom Tooltip ---
interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomPayload[];
  label?: string;
}
function ChartTooltipContent({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="p-2 bg-white border shadow rounded">
      <div>{label}</div>
      {payload.map((item, idx) => (
        <div key={idx}>
          <span>{item.name}:</span>{" "}
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// --- Custom Legend ---
interface CustomLegendPayload {
  color: string;
  value: string;
  type: string;
  id?: string;
}
interface CustomLegendProps {
  payload?: CustomLegendPayload[];
}
function ChartLegendContent({ payload }: CustomLegendProps) {
  if (!payload || payload.length === 0) return null;
  return (
    <div className="flex space-x-3 items-center">
      {payload.map((entry) => (
        <span key={entry.value} className="flex items-center space-x-1">
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: entry.color,
              marginRight: 4,
              borderRadius: 2,
            }}
          ></span>
          <span>{entry.value}</span>
        </span>
      ))}
    </div>
  );
}

// --- Usage Example with Data ---
const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
];

const chartConfig: ChartConfig = {
  uv: { label: "UV", color: "#8884d8" },
  pv: { label: "PV", color: "#82ca9d" },
};

export default function ExampleChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip content={<ChartTooltipContent />} />
          <RechartsLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

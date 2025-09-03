"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

type Datum = { name: string; value: number }

export function MetricBar({ data }: { data: Datum[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="value" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} barSize={30}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

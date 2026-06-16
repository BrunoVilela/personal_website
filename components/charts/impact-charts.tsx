"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { publicationsByYear } from "@/data/impact";

export function PublicationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={publicationsByYear}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="publications" fill="#2f7d4f" radius={[4, 4, 0, 0]} name="Publications" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CitationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={publicationsByYear}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="citations" stroke="#15577b" strokeWidth={3} name="Citations" />
      </LineChart>
    </ResponsiveContainer>
  );
}

"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { coauthorNetwork } from "@/data/impact";

type NetworkNode = d3.SimulationNodeDatum & {
  id: string;
};

type NetworkLink = d3.SimulationLinkDatum<NetworkNode> & {
  source: string | NetworkNode;
  target: string | NetworkNode;
  weight: number;
};

export function CoauthorNetwork() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = ref.current.clientWidth || 720;
    const height = 340;
    const nodes: NetworkNode[] = Array.from(new Set(coauthorNetwork.flatMap((d) => [d.source, d.target]))).map((id) => ({ id }));
    const links: NetworkLink[] = coauthorNetwork.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(links).id((d) => d.id).distance(95))
      .force("charge", d3.forceManyBody().strength(-420))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#9aa9b5")
      .attr("stroke-width", (d) => Math.max(1, d.weight / 2));

    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g");

    node.append("circle").attr("r", (d) => (d.id === "Bruno Vilela" ? 18 : 12)).attr("fill", (d) => (d.id === "Bruno Vilela" ? "#15577b" : "#2f7d4f"));
    node
      .append("text")
      .text((d) => d.id)
      .attr("x", 16)
      .attr("y", 4)
      .attr("font-size", 12)
      .attr("fill", "currentColor");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as NetworkNode).x ?? 0)
        .attr("y1", (d) => (d.source as NetworkNode).y ?? 0)
        .attr("x2", (d) => (d.target as NetworkNode).x ?? 0)
        .attr("y2", (d) => (d.target as NetworkNode).y ?? 0);
      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return <svg ref={ref} className="h-[340px] w-full overflow-visible" role="img" aria-label="Rede de coautoria" />;
}

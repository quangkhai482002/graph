import React, { useEffect, useRef } from "react";
import G6, { Graph } from "@antv/g6";

const GraphComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dữ liệu cho đồ thị
    const data = {
      nodes: [
        {
          id: "node1",
          label: "Node 1",
          x: 100,
          y: 200,
          customData: { type: "A", value: 10 },
        },
        {
          id: "node2",
          label: "Node 2",
          x: 300,
          y: 200,
          customData: { type: "B", value: 20 },
        },
        {
          id: "node3",
          label: "Node 3",
          x: 500,
          y: 200,
          customData: { type: "C", value: 30 },
        },
      ],
      edges: [
        { source: "node1", target: "node2", label: "Edge 1" },
        { source: "node2", target: "node3", label: "Edge 2" },
      ],
    };
    const tooltip = new G6.Tooltip({
      offsetX: 10,
      offsetY: 20,
      getContent(e) {
        const outDiv = document.createElement("div");
        outDiv.style.width = "180px";
        outDiv.innerHTML = `
            <h4>自定义tooltip</h4>
            <ul>
              <li>Label: ${
                e?.item?.getModel().label || e?.item?.getModel().id
              }</li>
              <li>Label: ${(e?.item?.getModel() as any).customData.value}</li>
            </ul>`;
        return outDiv;
      },
      itemTypes: ["node"],
    });

    // Khởi tạo đồ thị
    const graph = new G6.Graph({
      container: containerRef.current, // Container DOM element
      //   width: containerRef.current.offsetWidth,
      //   height: containerRef.current.offsetHeight,
      modes: {
        default: ["drag-node", "zoom-canvas"], // Chế độ mặc định
      },

      defaultNode: {
        type: "circle",
        size: 40,
        style: {
          fill: "#C6E5FF",
          stroke: "#5B8FF9",
        },
      },
      defaultEdge: {
        style: {
          stroke: "#F6BD16",
        },
        labelCfg: {
          style: {
            fill: "#000",
            fontSize: 12,
          },
        },
      },
      plugins: [tooltip],
    });

    // Gán graph vào ref để dễ quản lý
    graphRef.current = graph;

    // Nạp dữ liệu vào đồ thị và render
    graph.data(data);
    graph.render();

    // Dọn dẹp đồ thị khi component bị hủy
    return () => {
      graph.destroy();
      graphRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
    />
  );
};

export default GraphComponent;

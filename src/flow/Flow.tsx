import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
} from "@xyflow/react";
import "./Flow.css";

import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "./constants";
import { InputNode } from "../components/node/InputNode";
import { TextNode } from "../components/node/TextNode";
import CustomEdge from "../components/edge/CustomEdge";

const nodeTypes = {
  input: InputNode,
  text: TextNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, type: "customEdges" }, eds)
      ),
    [setEdges]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        color: "black",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        onConnect={onConnect}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}

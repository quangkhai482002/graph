import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

export function InputNode() {
  const [input, setInput] = useState("");
  const { setNodes } = useReactFlow();
  function handleClick() {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: Math.random().toString(),
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: { text: input },
        type: "text",
      },
    ]);
    setInput("");
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="inputNode">
        <input
          id="text"
          name="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="nodrag"
        />
        <button onClick={handleClick}>Add</button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

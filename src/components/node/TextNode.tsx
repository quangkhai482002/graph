import { NodeProps, Position } from "@xyflow/react";
import CustomHandle from "../CustomHandle";

export function TextNode({
  data,
}: NodeProps<{
  id: string;
  position: { x: number; y: number };
  data: { text: string };
}>) {
  return (
    <>
      <CustomHandle type="target" position={Position.Top} />
      <div className="textNode">
        <span>{data.text}</span>
      </div>
      <CustomHandle type="source" position={Position.Bottom} id="b" />
    </>
  );
}

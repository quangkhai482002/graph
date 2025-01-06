// import { Graph } from "@antv/g6";

// import { Box, Typography } from "@mui/material";
// import { useEffect, useRef } from "react";

// const CreateGraph = (container: HTMLDivElement) => {
//   const graph = new Graph({
//     container: container,
//     data: {
//       nodes: [
//         {
//           id: "node-1",
//           label: "Node 1",
//           style: {
//             x: 50,
//             y: 100,
//             fill: "red",
//             labelText: "node-1",
//           },
//           data: { info: "Data for Node 1", type: "ip", name: "node-1" },
//         },
//         {
//           id: "node-2",
//           label: "Node 2",
//           style: { x: 150, y: 100, fill: "blue", labelText: "node-2" },
//           data: { info: "Data for Node 2" },
//         },
//         {
//           id: "node-3",
//           label: "Node 3",
//           style: { x: 200, y: 200, fill: "green", labelText: "node-3" },
//           data: { info: "Data for Node 3" },
//         },
//       ],
//       edges: [
//         {
//           id: "edge-1",
//           source: "node-1",
//           target: "node-2",
//           style: {
//             endArrow: true, // change color of arrow
//             stroke: "green",
//           },
//         },
//         {
//           id: "edge-2",
//           source: "node-1",
//           target: "node-3",
//           style: {
//             endArrow: true,
//           },
//         },
//         {
//           id: "edge-3",
//           source: "node-1",
//           target: "node-1",
//           style: {
//             endArrow: true,
//           },
//         },
//       ],
//     },
//     behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
//     plugins: [{ type: "tooltip", key: "tooltip" }],
//   });
//   graph.updatePlugin({
//     key: "tooltip",
//     enable: "node",
//   });

//   graph.render();
// };

// export default () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       CreateGraph(containerRef.current);
//     }
//   }, []);

//   return (
//     <Box sx={{ height: "100vh" }}>
//       <Typography variant="h4">Use G6 in React</Typography>
//       <Box
//         sx={{
//           height: "90vh",
//           border: "1px solid #ccc",
//         }}
//         ref={containerRef}
//       />
//     </Box>
//   );
// };

import React from "react";
import { GraphView } from "react-digraph";

const NODE_KEY = "id"; // Unique identifier for nodes

const sampleNodes = [
  { id: "1", title: "Parent 1" },
  { id: "2", title: "Parent 2" },
  { id: "3", title: "Child" },
];

const sampleEdges = [
  { source: "1", target: "3", type: "custom" },
  { source: "2", target: "3", type: "custom" },
];

const Graph = () => {
  const onSelectNode = (node) => {
    console.log("Selected node:", node);
  };

  const onCreateNode = (x, y) => {
    console.log(`Create node at (${x}, ${y})`);
  };

  const onUpdateNode = (node) => {
    console.log("Node updated:", node);
  };

  const onDeleteNode = (node) => {
    console.log("Node deleted:", node);
  };

  const onSelectEdge = (edge) => {
    console.log("Selected edge:", edge);
  };

  const onDeleteEdge = (edge) => {
    console.log("Edge deleted:", edge);
  };

  const onCreateEdge = (source, target) => {
    console.log(`Create edge from ${source} to ${target}`);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GraphView
        nodeKey={NODE_KEY}
        nodes={sampleNodes}
        edges={sampleEdges}
        selected={{}}
        nodeTypes={{}}
        nodeSubtypes={{}}
        edgeTypes={{}}
        onSelectNode={onSelectNode}
        onCreateNode={onCreateNode}
        onUpdateNode={onUpdateNode}
        onDeleteNode={onDeleteNode}
        onSelectEdge={onSelectEdge}
        onDeleteEdge={onDeleteEdge}
        onCreateEdge={onCreateEdge}
      />
    </div>
  );
};

export default Graph;

import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialEdges } from "./Data/initialEdges";
import { initialNodes } from "./Data/initialNodes";
import "./modal.css";
import TextUpdaterNode from "./components/TextUpdaterNode";


const nodeTypes = {
  start: TextUpdaterNode,
  stage: TextUpdaterNode,
  pretask: TextUpdaterNode,
  finish: TextUpdaterNode,
};

export default function App() {


  const [nodes, setNodes, onNodesChange] = useNodesState(
    JSON.parse(localStorage.getItem("updatedNodes")) || initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    JSON.parse(localStorage.getItem("updatedEdges")) || initialEdges
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [sourceNodeId, setSourceNodeId] = useState("");
  const [targetNodeId, setTargetNodeId] = useState("");

  const addEdgeModal = () => {
    setIsModalOpen(true);
  };

  const deleteEdgeModal = ()=>{
    setIsDelModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDelModalOpen(false);
  };

  const handleEdgeAddition = () => {
    const newEdge = {
      id: `${sourceNodeId}-${targetNodeId}`,
      source: sourceNodeId,
      target: targetNodeId,
    };

    setEdges([...edges, newEdge]);
    localStorage.setItem("updatedEdges", JSON.stringify([...edges, newEdge]));
    localStorage.setItem("updatedNodes", JSON.stringify(nodes));
    setSourceNodeId("");
    setTargetNodeId("");
    setIsModalOpen(false);
  };

  const handleEdgeDeletion =()=>{
    const filteredEdges = edges.filter((ele,ind)=>{
      if(ele.source == sourceNodeId && ele.target == targetNodeId){
      }else{
        return ele
      }
    })

    setEdges(filteredEdges);
    localStorage.setItem("updatedEdges", JSON.stringify(filteredEdges));
    setSourceNodeId("");
    setTargetNodeId("");
    setIsDelModalOpen(false);
  }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "90vh", display: "flex" }}>
      <div
        style={{
          width: "70%",
          marginLeft: "40px",
          border: "2px solid white",
          borderRadius: "10px",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          className="reactflow"
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} style={{backgroundColor:""}}/>
        </ReactFlow>

        {isModalOpen && (
          <div className="modal">
            <h2>Add an Edge</h2>
            <div className="modal-body">
              Source Node:
              <select
                value={sourceNodeId}
                onChange={(e) => setSourceNodeId(e.target.value)}
                className="modal-select"
              >
                <option value="">Select Source Node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-body">
              Target Node:
              <select
                value={targetNodeId}
                onChange={(e) => setTargetNodeId(e.target.value)}
                className="modal-select"
              >
                <option value="">Select Target Node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button onClick={handleModalClose} className="modal-button">
                Close
              </button>
              <button onClick={handleEdgeAddition} className="modal-button">
                Connect Nodes
              </button>
            </div>
          </div>
        )}

        {isDelModalOpen && (
          <div className="modal">
            <h2>Delete an Edge</h2>
            <div className="modal-body">
              Source Node:
              <select
                value={sourceNodeId}
                onChange={(e) => setSourceNodeId(e.target.value)}
                className="modal-select"
              >
                <option value="">Select Source Node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-body">
              Target Node:
              <select
                value={targetNodeId}
                onChange={(e) => setTargetNodeId(e.target.value)}
                className="modal-select"
              >
                <option value="">Select Target Node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button onClick={handleModalClose} className="modal-button">
                Close
              </button>
              <button onClick={handleEdgeDeletion} className="modal-button">
                Delete Edge
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <button style={{ margin: "25px" }} onClick={addEdgeModal}>
          Add Edge
        </button>
        <button style={{ margin: "25px" }} onClick={deleteEdgeModal}>
          Delete Edge
        </button>
      </div>
    </div>
  );
}

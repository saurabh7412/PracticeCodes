import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { initialNodes } from "../Data/initialNodes";
import edit from "../assets/edit.svg";

const handleStyle = { left: 10 };

const updatedNodes =
  JSON.parse(localStorage.getItem("updatedNodes")) || initialNodes;

export default function TextUpdaterNode({ data }) {
  const [showEdit, setShowEdit] = useState(false);
  const [inpVal, setInpVal] = useState(data.label);

  const onChange = useCallback((evt) => {
    setInpVal(evt.target.value);
  }, []);

  const handleSubmit = () => {
    const filterNodes = updatedNodes.map((ele) => {
      if (ele.data.label == data.label) {
        ele.data.label = inpVal;
      }
      return ele;
    });

    localStorage.setItem("updatedNodes", JSON.stringify(filterNodes));

    setShowEdit((p) => !p);
  };

  const handleCancel = () => {
    setShowEdit((p) => !p);
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      {!showEdit && (
        <div
          style={{
            display: "flex",
            margin: "auto",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {inpVal}
          </p>
          <img
            src={edit}
            style={{ width: "20px", marginLeft: "25px" }}
            onClick={() => setShowEdit((p) => !p)}
          />
        </div>
      )}
      {showEdit && (
        <div
          style={{ display: "flex", flexDirection: "column", margin: "auto" }}
        >
          <input
            style={{ fontSize: "18px", padding: "4px", borderRadius: "8px" }}
            id="text"
            name="text"
            onChange={onChange}
            className="nodrag"
            placeholder="Enter New Title"
            value={inpVal}
          />
          <br />
          <div
            style={{
              display: "flex",
              width:"80%",
              margin: "auto",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button onClick={handleSubmit}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

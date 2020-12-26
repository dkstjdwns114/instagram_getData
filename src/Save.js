import React, { useState } from "react";
const saveStyle = {
  width: "80px",
  height: "25px",
  border: "2px solid #000000",
  cursor: "pointer"
};
const saveColor = {
  backgroundColor: "#000000",
  color: "white"
};

export default function Save() {
  const [isSave, setSave] = useState(false);
  const savedStyle = Object.assign({}, saveStyle, saveColor);
  const clicked = () => {
    if (isSave) {
      setSave(false);
      return;
    }
    setSave(true);
  };
  return (
    <div style={isSave ? savedStyle : saveStyle} onClick={clicked}>
      <span>{isSave ? "저장됨" : "저장안됨"}</span>
    </div>
  );
}

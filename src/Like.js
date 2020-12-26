import React, { useState } from "react";
const likeStyle = {
  width: "80px",
  height: "25px",
  border: "2px solid deeppink",
  cursor: "pointer"
};
const likeColor = {
  backgroundColor: "deeppink",
  color: "white"
};

export default function Like({ like }) {
  const [likeCnt, setLikeCnt] = useState(like);
  const [isLike, setIsLike] = useState(false);
  const likedStyle = Object.assign({}, likeStyle, likeColor);
  const clicked = (e) => {
    if (isLike) {
      setIsLike(false);
      setLikeCnt(likeCnt - 1);
      return;
    }
    setIsLike(true);
    setLikeCnt(likeCnt + 1);
  };
  return (
    <div style={isLike ? likedStyle : likeStyle} onClick={clicked}>
      <span>like {likeCnt}</span>
    </div>
  );
}

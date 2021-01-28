import React, { useState } from "react";

const imageSize = {
  width: "40%",
  height: "40%"
};

export default function ThumbnailContents({ thumbnails }) {
  let trimThumbnails = thumbnails.trim();

  let splitThumbnails = trimThumbnails.split(" ");
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    if (index + 1 === splitThumbnails.length) return;
    setIndex(index + 1);
  };
  const prevImage = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };
  return (
    <div>
      {splitThumbnails[index].substr(0, 7) !== "isVideo" ? (
        <img
          src={splitThumbnails[index]}
          style={imageSize}
          alt={`${index + 1}번 이미지`}
        />
      ) : (
        <video controls loop muted width="40%" height="40%">
          <source src={splitThumbnails[index].substr(7)} type="video/mp4" />
        </video>
      )}

      <p>
        <button onClick={prevImage}>{"이전"}</button>
        <span>
          {index + 1} / {splitThumbnails.length}
        </span>
        <button onClick={nextImage}>{"다음"}</button>
      </p>
    </div>
  );
}

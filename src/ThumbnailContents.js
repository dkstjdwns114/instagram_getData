import React, { useState } from "react";

export default function ThumbnailContents({ photo_thumbnails, isDetail }) {
  const [index, setIndex] = useState(0);
  const images = Object.values(photo_thumbnails).map((image, index) => {
    return image;
  });

  const nextImage = () => {
    if (index + 1 === images.length) return;
    setIndex(index + 1);
  };
  const prevImage = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };
  return (
    <div>
      {images[index].type === "image" ? (
        <img src={images[index].thumbnails} alt={`${index + 1}번 이미지`} />
      ) : (
        <video controls loop muted width="140" height="140">
          {isDetail ? (
            <source
              src={"../../" + images[index].thumbnails}
              type="video/mp4"
            />
          ) : (
            <source src={images[index].thumbnails} type="video/mp4" />
          )}
        </video>
      )}

      <p>
        <button onClick={prevImage}>{"이전"}</button>
        <span>
          {index + 1} / {images.length}
        </span>
        <button onClick={nextImage}>{"다음"}</button>
      </p>
    </div>
  );
}

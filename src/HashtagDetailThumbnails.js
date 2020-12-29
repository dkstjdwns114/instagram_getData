import React from "react";

const imageSize = {
  width: "293px",
  height: "293px"
};

export default function HashtagDetailThumbnails({ imgArr, shortcode }) {
  let thumbnailList = [];

  imgArr.map((thumbnailImage, index) => {
    (index + 1) % 3 === 0
      ? thumbnailList.push(
          <a
            key={shortcode[index]}
            href={"https://www.instagram.com/p/" + shortcode[index]}
          >
            <img
              src={thumbnailImage}
              style={imageSize}
              alt={`${index + 1}번 이미지`}
            />
            <br />
          </a>
        )
      : thumbnailList.push(
          <>
            <a
              key={shortcode[index]}
              href={"https://www.instagram.com/p/" + shortcode[index]}
            >
              <img
                src={thumbnailImage}
                style={imageSize}
                alt={`${index + 1}번 이미지`}
              />
            </a>
            <span> </span>
          </>
        );
  });
  return (
    <div>
      <p>받아온 게시물 : {shortcode.length}개</p>
      {thumbnailList}
    </div>
  );
}

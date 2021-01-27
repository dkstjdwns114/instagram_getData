import React from "react";
import { Link } from "react-router-dom";

const imageSize = {
  width: "293px",
  height: "293px"
};

export default function HashtagDetailThumbnails({ imgArr, shortcode }) {
  let thumbnailList = [];

  imgArr.forEach((thumbnailImage, index) => {
    (index + 1) % 3 === 0
      ? thumbnailList.push(
          <Link key={shortcode[index]} to={"/postDetail/" + shortcode[index]}>
            <img
              src={thumbnailImage}
              style={imageSize}
              alt={`${index + 1}번 이미지`}
            />
            <br />
          </Link>
        )
      : thumbnailList.push(
          <>
            <Link key={shortcode[index]} to={"/postDetail/" + shortcode[index]}>
              <img
                src={thumbnailImage}
                style={imageSize}
                alt={`${index + 1}번 이미지`}
              />
            </Link>
            <span> </span>
          </>
        );
  });
  return <div>{thumbnailList}</div>;
}

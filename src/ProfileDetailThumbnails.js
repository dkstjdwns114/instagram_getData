import React from "react";

const imageSize = {
  width: "293px",
  height: "293px"
};

export default function ProfileDetailThumbnails({
  username,
  imgArr,
  shortcode,
  followedCnt,
  followingCnt,
  totalPostCnt
}) {
  let thumbnailList = [];

  imgArr.map((thumbnailImage, index) => {
    (index + 1) % 3 === 0
      ? thumbnailList.push(
          <a
            key={shortcode[index]}
            href={"/postDetail/" + username + "/" + shortcode[index]}
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
              href={"/postDetail/" + username + "/" + shortcode[index]}
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
      <p>팔로워 수 : {followedCnt}명</p>
      <p>팔로잉 수 : {followingCnt}명</p>
      <p>총 게시물 : {totalPostCnt}개</p>
      <p>받아온 게시물 : {shortcode.length}개</p>
      {thumbnailList}
    </div>
  );
}

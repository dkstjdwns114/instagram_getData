import React from "react";

export default function ProfileDetailThumbnails({
  userId,
  userInfo,
  postDetailIdx
}) {
  let info = userInfo.map((information, inx) => {
    return Object.values(information);
  });

  let postIdx = postDetailIdx.map((number, inx) => {
    return number;
  });

  let thumbnailArr = [];
  for (let i = 0; i < info.length; i++) {
    thumbnailArr.push(info[i][0]["photo_thumbnails"][0]);
  }

  let thumbnailList = [];

  thumbnailArr.forEach((thumbnail, index) => {
    thumbnail.type === "image"
      ? (index + 1) % 3 === 0
        ? thumbnailList.push(
            <a href={"/postDetail/" + postIdx[index]}>
              <img src={thumbnail.thumbnails} alt={`${index + 1}번 이미지`} />
              <br />
            </a>
          )
        : thumbnailList.push(
            <a href={"/postDetail/" + postIdx[index]}>
              <img src={thumbnail.thumbnails} alt={`${index + 1}번 이미지`} />
            </a>
          )
      : (index + 1) % 3 === 0
      ? thumbnailList.push(
          <>
            <video controls loop muted width="140" height="140">
              <source src={"../../" + thumbnail.thumbnails} type="video/mp4" />
            </video>
            <a href={"/postDetail/" + postIdx[index]}>←게시물 상세보기</a>
            <br />
          </>
        )
      : thumbnailList.push(
          <>
            <video controls loop muted width="140" height="140">
              <source src={"../../" + thumbnail.thumbnails} type="video/mp4" />
            </video>
            <a href={"/postDetail/" + postIdx[index]}>←게시물 상세보기</a>
          </>
        );
  });
  return (
    <div>
      <p>게시물 : {thumbnailArr.length}개</p>
      {thumbnailList}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

const imageSize = {
  width: "293px",
  height: "293px"
};

export default function ProfileDetailThumbnails({
  imgArr,
  shortcode,
  followedCnt,
  followingCnt,
  totalPostCnt,
  avgCommentCnt,
  avgLikeCnt,
  greatestLikeCntPost,
  greatestLikePostShortcode,
  avgDateCnt,
  avgHoursCnt,
  avgMinutesCnt
}) {
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
  return (
    <div>
      <p>팔로워 수 : {followedCnt}명</p>
      <p>팔로잉 수 : {followingCnt}명</p>
      <p>총 게시물 : {totalPostCnt}개</p>
      <p>받아온 게시물 : {shortcode.length}개</p>
      <p>-- 받아온 게시물 기준 --</p>
      <p>평균 좋아요 : {avgLikeCnt.toFixed(1)}개</p>
      <p>
        최고 좋아요 : {greatestLikeCntPost}개{" -> "}
        <a target="_blank" href={"/postDetail/" + greatestLikePostShortcode}>
          [게시물 링크]
        </a>
      </p>
      <p>평균 댓글 : {avgCommentCnt.toFixed(1)}개</p>
      {thumbnailList}
    </div>
  );
}

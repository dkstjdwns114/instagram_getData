import React from "react";
import Profile from "./Profile";
import ProfileDetailThumbnails from "./ProfileDetailThumbnails";

export default function ProfileDetail({
  profileImg,
  username,
  imgArr,
  shortcode,
  followedCnt,
  followingCnt,
  totalPostCnt,
  avgCommentCnt,
  avgLikeCnt,
  greatestLikeCntPost,
  greatestLikePostShortcode,
  match
}) {
  return (
    <div>
      <h4>이미지 클릭시 해당 게시물의 상세페이지로 이동합니다.</h4>
      <h1>
        <a href="/">HOME</a> <a href="/HashTag">HashTag</a>
      </h1>
      <h2>{username}의 ProfileDetail</h2>
      <Profile profile_image={profileImg} username={username} />
      <ProfileDetailThumbnails
        username={username}
        imgArr={imgArr}
        shortcode={shortcode}
        followedCnt={followedCnt}
        followingCnt={followingCnt}
        totalPostCnt={totalPostCnt}
        avgCommentCnt={avgCommentCnt}
        avgLikeCnt={avgLikeCnt}
        greatestLikeCntPost={greatestLikeCntPost}
        greatestLikePostShortcode={greatestLikePostShortcode}
      />
    </div>
  );
}

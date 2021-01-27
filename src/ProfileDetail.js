import React from "react";
import Profile from "./Profile";
import ProfileDetailThumbnails from "./ProfileDetailThumbnails";
import { Link } from "react-router-dom";

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
  avgDateCnt,
  avgHoursCnt,
  avgMinutesCnt
}) {
  return (
    <div>
      <h4>이미지 클릭시 해당 게시물의 상세페이지로 이동합니다.</h4>
      <h1>
        <Link to="/">HOME</Link> <Link to="/HashTag/미스코리아">HashTag</Link>
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
        avgDateCnt={avgDateCnt}
        avgHoursCnt={avgHoursCnt}
        avgMinutesCnt={avgMinutesCnt}
      />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Profile from "../components/Common/Profile";
import ThumbnailText from "../components/Post/ThumbnailText";
import ThumbnailContents from "../components/Post/ThumbnailContents";
import Like from "../components/Common/Like";
import Save from "../components/Common/Save";
import MainFeedReplies from "../components/Mainfeed/MainFeedReplies";

export default function MainFeed({
  ovEdges,
  profileImg,
  username,
  thumbnails,
  shortcode,
  tnContents,
  likeCnt,
  commentCnt
}) {
  return (
    <div>
      <h1>
        <Link to="/HashTag/블랙핑크">해시태그 검색하기</Link>
      </h1>
      <h2>Instagram Feed</h2>
      {ovEdges.map((node, index) => {
        return (
          <div key={index} style={{ borderBottom: "1px solid gray" }}>
            <Profile profile_image={profileImg} username={username} />
            <ThumbnailContents thumbnails={thumbnails[index]} />
            <Link to={"/postDetail/" + shortcode[index]}>게시물 상세보기</Link>
            <br />
            <br />
            <ThumbnailText content={tnContents[index]} />
            <br />
            <Like like={likeCnt[index]} />
            <Save />
            <MainFeedReplies replies={commentCnt[index]} />
          </div>
        );
      })}
    </div>
  );
}

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
      <h2>* 프로그램의 성능은 고려하지 않고 제작하였습니다. *</h2>
      <h4>
        프로필사진 또는 ←XXX의 프로필사진 클릭시 프로필 상세페이지로 이동합니다.
      </h4>
      <h4>게시물 상세보기 클릭시 게시물 상세페이지로 이동합니다.</h4>
      <h4>
        HashTag 검색하기 클릭시 해시태그를 검색할 수 있는 페이지로 이동합니다.
      </h4>
      <h4>실제 인스타그램 데이터입니다.</h4>
      <h5>
        이 프로그램의 댓글쓰기, 좋아요, 저장 기능은 실제 인스타그램과 통신하지
        않습니다.
      </h5>
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

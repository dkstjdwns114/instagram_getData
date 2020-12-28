import React from "react";
import Profile from "./Profile";
import ThumbnailText from "./ThumbnailText";
import ThumbnailContents from "./ThumbnailContents";
import Replies from "./replies";
import Like from "./Like";
import Save from "./Save";

export default function Post({
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
      <h4>실제 인스타그램 데이터입니다.</h4>
      <br />
      <h2>Instagram Feed</h2>
      {ovEdges.map((node, index) => {
        return (
          <div key={index} style={{ borderBottom: "1px solid gray" }}>
            <Profile profile_image={profileImg} username={username} />
            <ThumbnailContents thumbnails={thumbnails[index]} />
            <a href={"/postDetail/" + username + "/" + shortcode[index]}>
              게시물 상세보기
            </a>
            <br />
            <br />
            <ThumbnailText content={tnContents[index]} />
            <br />
            <Like like={likeCnt[index]} />
            {/* <Save /> */}
            <Replies replies={commentCnt[index]} />
          </div>
        );
      })}
    </div>
  );
}

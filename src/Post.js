import React from "react";
import Profile from "./Profile";
import ThumbnailText from "./ThumbnailText";
import PostData from "./data.json";
import ThumbnailContents from "./ThumbnailContents";
import Replies from "./replies";
import Like from "./Like";
import Save from "./Save";

function Post() {
  return (
    <div>
      <h2>* 프로그램의 성능은 고려하지 않고 제작하였습니다. *</h2>
      <h4>
        프로필사진 또는 ←XXX의 프로필사진 클릭시 프로필 상세페이지로 이동합니다.
      </h4>
      <h4>게시물 상세보기 클릭시 게시물 상세페이지로 이동합니다.</h4>
      <br />
      <h2>Instagram Feed</h2>
      {PostData.post_list.map((post_list, index) => {
        return (
          <div key={index} style={{ borderBottom: "1px solid gray" }}>
            <Profile
              profile_image={post_list.profile_image}
              id={post_list.id}
            />
            <ThumbnailContents photo_thumbnails={post_list.photo_thumbnails} />
            <a href={"/postDetail/" + post_list.idx}>게시물 상세보기</a>
            <br />
            <br />
            <ThumbnailText content={post_list.contents} />
            <br />
            <Like like={post_list.like_cnt} />
            <Save />
            <Replies replies={post_list.replies} />
          </div>
        );
      })}
    </div>
  );
}
export default Post;

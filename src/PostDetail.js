import React from "react";
import PostData from "./data.json";
import Like from "./Like";
import Profile from "./Profile";
import Replies from "./replies";
import Save from "./Save";
import ThumbnailContents from "./ThumbnailContents";
import ThumbnailText from "./ThumbnailText";

export default function PostDetail({ match }) {
  let userProfile;
  let postContent;
  let postText;
  let reply;
  let like;
  let save;

  PostData.post_list.map((post_list, index) => {
    if (post_list.idx == match.params.idx) {
      userProfile = (
        <Profile profile_image={post_list.profile_image} id={post_list.id} />
      );
      postContent = (
        <ThumbnailContents
          photo_thumbnails={post_list.photo_thumbnails}
          isDetail={true}
        />
      );
      postText = <ThumbnailText content={post_list.contents} />;
      reply = <Replies replies={post_list.replies} />;
      like = <Like like={post_list.like_cnt} />;
      save = <Save />;
    }
    return userProfile;
  });
  return (
    <div>
      <h1>
        <a href="/">HOME</a>
      </h1>
      <h2>{match.params.idx}번 게시물 상세페이지입니다.</h2>
      {userProfile}
      {postContent}
      {postText}
      <br />
      {like}
      {save}
      {reply}
    </div>
  );
}

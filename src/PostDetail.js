import React from "react";
import Like from "./Like";
import Profile from "./Profile";
import PostDetailReplies from "./PostDetailReplies";
import ThumbnailContents from "./ThumbnailContents";
import ThumbnailText from "./ThumbnailText";
import Save from "./Save";

export default function PostDetail({
  profileImg,
  username,
  thumbnails,
  tnContents,
  comments,
  commentCnt,
  likeCnt
}) {
  return (
    <div>
      <h1>
        <a href="/">HOME</a> <a href="/HashTag">HashTag</a>
      </h1>
      <Profile profile_image={profileImg} username={username} />
      <ThumbnailContents thumbnails={thumbnails} />
      <ThumbnailText content={tnContents} />
      <br />
      <Like like={likeCnt} />
      <Save />
      <PostDetailReplies commentCnt={commentCnt} comments={comments} />
    </div>
  );
}

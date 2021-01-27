import React from "react";
import { Link } from "react-router-dom";
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
  likeCnt,
  match
}) {
  return (
    <div>
      <h1>
        <Link to="/">HOME</Link> <Link to="/HashTag/수영복">HashTag</Link>
      </h1>
      <Profile profile_image={profileImg} username={username} />
      <ThumbnailContents thumbnails={thumbnails} />
      <ThumbnailText content={tnContents} match={match} />
      <br />
      <Like like={likeCnt} />
      <Save />
      <PostDetailReplies commentCnt={commentCnt} comments={comments} />
    </div>
  );
}

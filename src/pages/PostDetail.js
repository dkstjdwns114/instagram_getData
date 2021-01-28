import React from "react";
import { Link } from "react-router-dom";
import Like from "../components/Common/Like";
import Profile from "../components/Common/Profile";
import PostDetailReplies from "../components/Post/PostDetailReplies";
import ThumbnailContents from "../components/Post/ThumbnailContents";
import ThumbnailText from "../components/Post/ThumbnailText";
import Save from "../components/Common/Save";

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

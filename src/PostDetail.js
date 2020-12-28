import React from "react";
import Like from "./Like";
import Profile from "./Profile";
import Replies from "./replies";
import ThumbnailContents from "./ThumbnailContents";
import ThumbnailText from "./ThumbnailText";

export default function PostDetail({
  ovEdges,
  profileImg,
  username,
  thumbnails,
  tnContents,
  commentCnt,
  likeCnt,
  thisShortcode
}) {
  return (
    <div>
      <h1>
        <a href="/">HOME</a>
      </h1>
      {ovEdges.map((edges, index) => {
        return (
          <>
            {(function () {
              if (edges.node.shortcode === thisShortcode) {
                return (
                  <>
                    <Profile profile_image={profileImg} username={username} />
                    <ThumbnailContents
                      thumbnails={thumbnails[index]}
                      isDetail={true}
                    />
                    <ThumbnailText content={tnContents[index]} />
                    <Like like={likeCnt[index]} />
                    <Replies replies={commentCnt[index]} />
                    {/* <Save /> */}
                  </>
                );
              }
            })()}
          </>
        );
      })}
    </div>
  );
}

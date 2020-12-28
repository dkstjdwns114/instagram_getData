import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import ProfileDetail from "./ProfileDetail";
import PostDetail from "./PostDetail";

function AxiosData({ match }) {
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let jsonGraphql;
  let profileImg;
  let jsonEdges;
  let ovEdges;
  let thumbnails;
  let likeCnt;
  let commentCnt;
  let textEdges;
  let ovTextEdges;
  let thumbnailText;
  let tnContents;
  let shortcode = [];
  let username;
  let imgArr = [];
  let totalPostCnt;
  let followedCnt;
  let followingCnt;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setData(null);
        setLoading(true);
        const response = await axios.get(
          "https://www.instagram.com/sooyaaa__/?__a=1"
        );
        setData(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error</div>;
  if (!jsonData) {
    return null;
  } else {
    jsonGraphql = Object.values(jsonData.graphql);

    // 프로필 이미지
    profileImg = jsonGraphql.map((graphql, idx) => {
      return graphql.profile_pic_url;
    });

    jsonEdges = jsonGraphql.map((graphql, idx) => {
      totalPostCnt = graphql.edge_owner_to_timeline_media.count;
      return graphql.edge_owner_to_timeline_media.edges;
    });
    ovEdges = Object.values(jsonEdges[0]);
    thumbnails = ovEdges.map((test, index) => {
      if (
        test.node.edge_sidecar_to_children === undefined &&
        test.node.is_video === true
      ) {
        return "isVideo" + test.node.video_url;
      } else if (
        test.node.edge_sidecar_to_children === undefined &&
        test.node.is_video === false
      ) {
        return test.node.display_url;
      } else {
        return test.node.edge_sidecar_to_children.edges;
      }
    });

    // 게시물 Img/Video url
    thumbnails.map((test, idx) => {
      if (typeof test === "object") {
        thumbnails[idx] = "";
        test.map((image) => {
          if (image.node.is_video) {
            thumbnails[idx] += "isVideo" + image.node.video_url + " ";
          } else {
            thumbnails[idx] += image.node.display_url + " ";
          }
        });
      }
    });

    // 좋아요 갯수
    likeCnt = ovEdges.map((edges, idx) => {
      return edges.node.edge_liked_by.count;
    });

    // 댓글 갯수
    commentCnt = ovEdges.map((edges, idx) => {
      return edges.node.edge_media_to_comment.count;
    });

    textEdges = ovEdges.map((edges) => {
      return edges.node.edge_media_to_caption.edges;
    });
    ovTextEdges = Object.values(textEdges);
    thumbnailText = ovTextEdges.map((text, idx) => {
      return text[0];
    });

    // 게시물 Text
    tnContents = thumbnailText.map((real, idx) => {
      if (real === undefined) {
        return "";
      } else {
        return real.node.text;
      }
    });

    ovEdges.map((edges) => {
      // 게시물 imgArr
      imgArr.push(edges.node.thumbnail_src);
      // 게시물 shortcode
      shortcode.push(edges.node.shortcode);
    });

    // username
    username = jsonGraphql[0].username;

    // 팔로워 수
    followedCnt = jsonGraphql[0].edge_followed_by.count;

    // 팔로잉 수
    followingCnt = jsonGraphql[0].edge_follow.count;
  }

  return (
    <div>
      <>
        {(function () {
          if (match.path === "/") {
            return (
              <>
                <Post
                  ovEdges={ovEdges}
                  profileImg={profileImg}
                  username={username}
                  thumbnails={thumbnails}
                  shortcode={shortcode}
                  tnContents={tnContents}
                  likeCnt={likeCnt}
                  commentCnt={commentCnt}
                />
              </>
            );
          } else if (match.path.substr(1, 10) === "postDetail") {
            let thisShortcode = match.params.shortcode;
            return (
              <PostDetail
                ovEdges={ovEdges}
                profileImg={profileImg}
                username={username}
                thumbnails={thumbnails}
                tnContents={tnContents}
                commentCnt={commentCnt}
                likeCnt={likeCnt}
                thisShortcode={thisShortcode}
              />
            );
          } else if (match.path.substr(1, 13) === "profileDetail") {
            return (
              <>
                <ProfileDetail
                  profileImg={profileImg}
                  username={username}
                  imgArr={imgArr}
                  shortcode={shortcode}
                  followedCnt={followedCnt}
                  followingCnt={followingCnt}
                  totalPostCnt={totalPostCnt}
                />
              </>
            );
          }
        })()}
      </>
    </div>
  );
}
export default AxiosData;

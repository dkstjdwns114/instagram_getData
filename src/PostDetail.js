import React, { useEffect, useState } from "react";
import PostData from "./data.json";
import Like from "./Like";
import Profile from "./Profile";
import Replies from "./replies";
import Save from "./Save";
import ThumbnailContents from "./ThumbnailContents";
import ThumbnailText from "./ThumbnailText";
import axios from "axios";

export default function PostDetail({ match }) {
  // AxiosData() 반복
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  if (!jsonData) return null;
  // ----------------

  let jsonGraphql = Object.values(jsonData.graphql);

  let profileImg = jsonGraphql.map((graphql, idx) => {
    return graphql.profile_pic_url;
  });

  let jsonEdges = jsonGraphql.map((graphql, idx) => {
    return graphql.edge_owner_to_timeline_media.edges;
  });

  let ovEdges = Object.values(jsonEdges[0]);

  let commentCnt = ovEdges.map((edges, idx) => {
    return edges.node.edge_media_to_comment.count;
  });

  let thumbnails = ovEdges.map((test, index) => {
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

  let textEdges = ovEdges.map((edges) => {
    return edges.node.edge_media_to_caption.edges;
  });

  let ovTextEdges = Object.values(textEdges);

  let thumbnailText = ovTextEdges.map((text, idx) => {
    return text[0];
  });

  let tnContents = thumbnailText.map((real, idx) => {
    if (real === undefined) {
      return "";
    } else {
      return real.node.text;
    }
  });

  let likeCnt = ovEdges.map((edges, idx) => {
    return edges.node.edge_liked_by.count;
  });

  let userProfile;
  let postContent;
  let postText;
  let reply;
  let like;
  let save;

  ovEdges.map((edges, index) => {
    if (edges.node.shortcode === match.params.shortcode) {
      userProfile = (
        <Profile
          profile_image={profileImg}
          username={jsonGraphql[0].username}
        />
      );
      postContent = (
        <ThumbnailContents thumbnails={thumbnails[index]} isDetail={true} />
      );
      postText = <ThumbnailText content={tnContents[index]} />;
      reply = <Replies replies={commentCnt[index]} />;
      like = <Like like={likeCnt[index]} />;
      // save = <Save />;
    }
    return userProfile;
  });
  return (
    <div>
      <h1>
        <a href="/">HOME</a>
      </h1>
      <h2>게시물 상세페이지</h2>
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

import React, { useEffect, useState } from "react";
import PostData from "./data.json";
import Profile from "./Profile";
import ProfileDetailThumbnails from "./ProfileDetailThumbnails";
import axios from "axios";

export default function ProfileDetail({ match }) {
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
  let totalPostCnt;
  let jsonGraphql = Object.values(jsonData.graphql);
  let jsonEdges = jsonGraphql.map((graphql, idx) => {
    totalPostCnt = graphql.edge_owner_to_timeline_media.count;
    return graphql.edge_owner_to_timeline_media.edges;
  });
  let profileImg = jsonGraphql.map((graphql, idx) => {
    return graphql.profile_pic_url;
  });
  let imgArr = [];
  let postIdx = [];
  let ovEdges = Object.values(jsonEdges[0]);
  ovEdges.map((edges) => {
    imgArr.push(edges.node.thumbnail_src);
    postIdx.push(edges.node.id);
  });

  return (
    <div>
      <h4>
        이미지의 경우 이미지 클릭, 동영상의 경우 우측에 게시물 상세보기 클릭시
        해당 게시물의 상세페이지로 이동합니다.
      </h4>
      <h1>
        <a href="/">HOME</a>
      </h1>
      <h2>{match.params.id}의 ProfileDetail</h2>
      <Profile profile_image={profileImg} username={jsonGraphql[0].username} />
      <ProfileDetailThumbnails
        username={jsonGraphql[0].username}
        imgArr={imgArr}
        postDetailIdx={postIdx}
        totalPostCnt={totalPostCnt}
      ></ProfileDetailThumbnails>
    </div>
  );
}

import React from "react";
import Profile from "./Profile";
import ThumbnailText from "./ThumbnailText";
import PostData from "./data.json";
import ThumbnailContents from "./ThumbnailContents";
import Replies from "./replies";
import Like from "./Like";
import Save from "./Save";

export default function Post({ jsonData }) {
  let jsonGraphql = Object.values(jsonData.graphql);
  let profileImg = jsonGraphql.map((graphql, idx) => {
    return graphql.profile_pic_url;
  });
  let jsonEdges = jsonGraphql.map((graphql, idx) => {
    return graphql.edge_owner_to_timeline_media.edges;
  });
  let ovEdges = Object.values(jsonEdges[0]);

  let thumbnails = ovEdges.map((test, index) => {
    if (test.node.edge_sidecar_to_children === undefined) {
      return test.node.display_url;
    } else {
      return test.node.edge_sidecar_to_children.edges;
    }
  });
  let childImg = [];
  thumbnails.map((test, idx) => {
    if (typeof test === "object") {
      test.map((image) => {
        childImg[idx] += image.node.display_url + " ";
      });
    } else {
      childImg[idx] += test;
    }
    childImg[idx] = childImg[idx].substr(9);
  });

  let likeCnt = ovEdges.map((edges, idx) => {
    return edges.node.edge_liked_by.count;
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
  return (
    <div>
      <h2>* 프로그램의 성능은 고려하지 않고 제작하였습니다. *</h2>
      <h4>
        프로필사진 또는 ←XXX의 프로필사진 클릭시 프로필 상세페이지로 이동합니다.
      </h4>
      <h4>게시물 상세보기 클릭시 게시물 상세페이지로 이동합니다.</h4>
      <br />
      <h2>Instagram Feed</h2>
      {ovEdges.map((node, index) => {
        return (
          <div key={index} style={{ borderBottom: "1px solid gray" }}>
            <Profile
              profile_image={profileImg}
              username={jsonGraphql[0].username}
            />
            <ThumbnailContents childImg={childImg[index]} />
            {/* <a href={"/postDetail/" + post_list.idx}>게시물 상세보기</a> */}
            <br />
            <br />
            <ThumbnailText content={tnContents[index]} />
            <br />
            <Like like={likeCnt[index]} />
            {/* <Save />
            <Replies replies={post_list.replies} /> */}
          </div>
        );
      })}
    </div>
  );
}

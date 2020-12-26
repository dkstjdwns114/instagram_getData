import React from "react";
import PostData from "./data.json";
import Profile from "./Profile";
import ProfileDetailThumbnails from "./ProfileDetailThumbnails";

export default function ProfileDetail({ match }) {
  let userProfile;
  let detailThumbnails = [];
  let postIdx = [];
  PostData.post_list.map((post_list, index) => {
    if (post_list.id === match.params.id) {
      userProfile = (
        <Profile profile_image={post_list.profile_image} id={post_list.id} />
      );
      postIdx.unshift(post_list.idx);
      detailThumbnails.unshift({ post_list });
    }
    return userProfile;
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
      {userProfile}
      <ProfileDetailThumbnails
        userId={match.params.id}
        userInfo={detailThumbnails}
        postDetailIdx={postIdx}
      ></ProfileDetailThumbnails>
    </div>
  );
}

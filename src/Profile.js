import React from "react";

export default function Profile({ profile_image, id }) {
  return (
    <div>
      <a href={"/profileDetail/" + id}>
        <img src={profile_image} alt={`${id} 프로필 이미지`} />
      </a>
      <a href={"/profileDetail/" + id}>{`←${id}의 프로필사진`}</a>
    </div>
  );
}

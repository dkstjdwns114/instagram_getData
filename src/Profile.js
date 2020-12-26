import React from "react";

export default function Profile({ profile_image, username }) {
  return (
    <div>
      <a href={"/profileDetail/" + username}>
        <img src={profile_image} alt={`${username} 프로필 이미지`} />
      </a>
      <span>
        <a href={"/profileDetail/" + username}>{`←${username}`}</a>의 프로필사진
      </span>
    </div>
  );
}

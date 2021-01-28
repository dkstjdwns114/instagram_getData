import React from "react";
import { Link } from "react-router-dom";

export default function Profile({ profile_image, username }) {
  return (
    <div>
      <Link to={"/profileDetail/" + username}>
        <img src={profile_image} alt={`${username} 프로필 이미지`} />
      </Link>
      <span>
        ←<Link to={"/profileDetail/" + username}>{username}</Link>의 프로필사진
      </span>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeed from "./MainFeed";
import ProfileDetail from "./ProfileDetail";
import PostDetail from "./PostDetail";
import UsernamePost from "./UsernamePost";
import HashtagDetailThumbnails from "./HashtagDetailThumbnails";

export default function HashtagPost({ match }) {
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tagname, setTagname] = useState("미스코리아");
  const [inputValue, setInputValue] = useState("");

  let jsonGraphql;
  let profileImg;
  let hashTagData;
  let totalPostCnt;
  let ovEdges;
  let thumbnails;
  let commentCnt;
  let textEdges;
  let ovTextEdges;
  let thumbnailText;
  let tnContents;
  let shortcode = [];
  let username = "haha";
  let imgArr = [];
  let followedCnt;
  let followingCnt;

  const sendTagname = (e) => {
    setTagname(inputValue);
    setInputValue(tagname);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setData(null);
        setLoading(true);
        const response = await axios.get(
          `https://www.instagram.com/explore/tags/${tagname}/?__a=1`
        );
        setData(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
      setInputValue(tagname);
    };
    fetchUsers();
  }, [tagname]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error</div>;
  if (!jsonData) {
    return null;
  } else {
    jsonGraphql = Object.values(jsonData.graphql);
    hashTagData = jsonGraphql[0];

    // 프로필 이미지
    profileImg = hashTagData.profile_pic_url;

    // 게시물 수
    totalPostCnt = hashTagData.edge_hashtag_to_media.count;

    ovEdges = hashTagData.edge_hashtag_to_media.edges;

    // 게시물 Img/Video url
    thumbnails = ovEdges.map((test, index) => {
      shortcode.push(test.node.shortcode);
      return test.node.thumbnail_src;
    });

    // // 좋아요 갯수
    // likeCnt = ovEdges.map((edges, idx) => {
    //   return edges.node.edge_liked_by.count;
    // });
    // // 댓글 갯수
    // commentCnt = ovEdges.map((edges, idx) => {
    //   return edges.node.edge_media_to_comment.count;
    // });

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

    // ovEdges.map((edges) => {
    //   // 게시물 imgArr
    //   imgArr.push(edges.node.thumbnail_src);
    //   // 게시물 shortcode
    //   shortcode.push(edges.node.shortcode);
    // });
    // // username
    // username = jsonGraphql[0].username;
    // // 팔로워 수
    // followedCnt = jsonGraphql[0].edge_followed_by.count;
    // // 팔로잉 수
    // followingCnt = jsonGraphql[0].edge_follow.count;
  }

  return (
    <div>
      <>
        <p>태그 파싱</p>
        <h1>
          <a href="/">HOME</a>
        </h1>
        <p>
          <input
            type="text"
            name="hashTag"
            value={inputValue}
            onChange={handleInputChange}
          />
          <input type="button" value="Submit" onClick={sendTagname} />
        </p>
        <img src={profileImg} alert="태그 프로필" />

        <p>태그 총 게시물 수 : {totalPostCnt}개</p>
        <HashtagDetailThumbnails
          username={username}
          imgArr={thumbnails}
          shortcode={shortcode}
          totalPostCnt={totalPostCnt}
        />
        {/* {(function () {
          if (match.path === "/") {
            return (
              <>
                <MainFeed
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
        })()} */}
      </>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeed from "./MainFeed";
import ProfileDetail from "./ProfileDetail";
import PostDetail from "./PostDetail";

export default function UsernamePost({ match }) {
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchUsername, setSearchUsername] = useState();
  const [inputValue, setInputValue] = useState("");

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
  let response;
  let jsonParentComment;
  let ovJsonParentComment;
  let comments = [];
  let isAlonePost = false;

  const sendTagname = (e) => {
    setSearchUsername(inputValue);
    setInputValue(searchUsername);
    if (
      match.path.substr(1, 13) === "profileDetail" ||
      match.path.substr(1, 10) === "postDetail"
    ) {
      document.location.href = `/profileDetail/${inputValue}`;
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    setInputValue(value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      sendTagname();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setData(null);
        setLoading(true);
        if (match.path === "/") {
          response = await axios.get(
            `https://www.instagram.com/${searchUsername}/?__a=1`
          );
          setInputValue(searchUsername);
        } else if (match.params.shortcode !== undefined) {
          response = await axios.get(
            `https://www.instagram.com/p/${match.params.shortcode}/?__a=1`
          );
        } else {
          response = await axios.get(
            `https://www.instagram.com/${match.params.username}/?__a=1`
          );
          setInputValue(match.params.username);
        }
        setData(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [searchUsername]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error</div>;
  if (!jsonData) {
    return null;
  } else if (jsonData && match.params.shortcode === undefined) {
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

    // 팔로워 수
    followedCnt = jsonGraphql[0].edge_followed_by.count;

    // 팔로잉 수
    followingCnt = jsonGraphql[0].edge_follow.count;
  } else if (match.params.shortcode !== undefined) {
    jsonGraphql = Object.values(jsonData.graphql);

    // 프로필 이미지
    profileImg = jsonGraphql.map((graphql, idx) => {
      username = graphql.owner.username;
      return graphql.owner.profile_pic_url;
    });

    jsonEdges = jsonGraphql.map((graphql, idx) => {
      likeCnt = graphql.edge_media_preview_like.count;
      if (graphql.edge_sidecar_to_children !== undefined) {
        return graphql.edge_sidecar_to_children.edges;
      } else {
        isAlonePost = true;
        if (graphql.is_video) {
          return "isVideo" + graphql.video_url;
        } else {
          return graphql.display_url;
        }
      }
    });

    jsonParentComment = jsonGraphql.map((graphql, idx) => {
      commentCnt = graphql.edge_media_to_parent_comment.count;
      return graphql.edge_media_to_parent_comment.edges;
    });
    ovJsonParentComment = Object.values(jsonParentComment[0]);

    // 댓글
    ovJsonParentComment.map((edges, idx) => {
      comments.push({ id: edges.node.owner.username, reply: edges.node.text });
    });

    if (!isAlonePost) {
      ovEdges = Object.values(jsonEdges[0]);
      ovEdges.map((edges, idx) => {
        if (edges.node.is_video) {
          thumbnails += "isVideo" + edges.node.video_url + " ";
        } else {
          thumbnails += edges.node.display_url + " ";
        }
      });
      thumbnails = thumbnails.substr(9);
    } else {
      thumbnails = jsonEdges[0];
    }

    tnContents = jsonGraphql.map((graphql, idx) => {
      if (graphql.edge_media_to_caption.edges[0] === undefined) {
        return "";
      } else {
        return graphql.edge_media_to_caption.edges[0].node.text;
      }
    });
  }

  return (
    <>
      <p>↓검색하고싶은 인스타그램 아이디를 입력하세요↓</p>
      <p>
        <input
          type="text"
          name="getUsername"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={onEnterPress}
          placeholder="아이디를 입력하세요"
        />
        <input type="button" value="Submit" onClick={sendTagname} />
      </p>
      <br />
      {(function () {
        if (match.path === "/") {
          if (searchUsername === undefined) {
            setSearchUsername("undefined");
          }
          return (
            <>
              <MainFeed
                ovEdges={ovEdges}
                profileImg={profileImg}
                username={searchUsername}
                thumbnails={thumbnails}
                shortcode={shortcode}
                tnContents={tnContents}
                likeCnt={likeCnt}
                commentCnt={commentCnt}
              />
            </>
          );
        } else if (match.path.substr(1, 10) === "postDetail") {
          if (searchUsername === undefined) {
            setSearchUsername(username);
          }
          return (
            <PostDetail
              profileImg={profileImg}
              username={username}
              thumbnails={thumbnails}
              tnContents={tnContents}
              comments={comments}
              commentCnt={commentCnt}
              likeCnt={likeCnt}
            />
          );
        } else if (match.path.substr(1, 13) === "profileDetail") {
          return (
            <>
              <ProfileDetail
                profileImg={profileImg}
                username={match.params.username}
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
  );
}

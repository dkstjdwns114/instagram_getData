import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainFeed from "../../pages/MainFeed";
import ProfileDetail from "../../pages/ProfileDetail";
import PostDetail from "../../pages/PostDetail";

export default function UsernamePost({ match }) {
  const [jsonData, setData] = useState(null);
  const [queryData, setQueryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchUsername, setSearchUsername] = useState();
  const [inputValue, setInputValue] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageCnt, setPagecnt] = useState(null);
  const [isPrivate, setIsprivate] = useState(null);

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

  // pagination
  let nextPageResponse;
  let has_next_page = false;
  let end_cursor;
  let userid;
  let edges = [];

  // avg likeCnt, commentCnt, timestamp, greatest likeCntPost
  let totCommentCnt = 0;
  let totLikeCnt = 0;
  let avgLikeCnt = 0;
  let avgCommentCnt = 0;
  let greatestLikeCntPost = 0;
  let greatestLikePostShortcode;
  let timestamp = 0;
  let totDateCnt = 0;
  let totHoursCnt = 0;
  let totMinutesCnt = 0;
  let avgDateCnt = 0;
  let avgHoursCnt = 0;
  let avgMinutesCnt = 0;

  const sendTagname = (e) => {
    setSearchUsername(inputValue);
    document.location.assign(`/profileDetail/${inputValue}`);
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

  const SearchUser = (
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
    </>
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setData(null);
        setLoading(true);
        if (match.path === "/") {
          response = await axios.get(
            `https://www.instagram.com/sooyaaa__/?__a=1`
          );
          setInputValue("sooyaaa__");
          setSearchUsername("sooyaaa__");
        } else if (match.params.shortcode !== undefined) {
          response = await axios.get(
            `https://www.instagram.com/p/${match.params.shortcode}/?__a=1`
          );
        } else {
          response = await axios.get(
            `https://www.instagram.com/${match.params.username}/?__a=1`
          );
          setInputValue(match.params.username);
          has_next_page =
            response.data.graphql.user.edge_owner_to_timeline_media.page_info
              .has_next_page;
          setHasNextPage(has_next_page);
          if (has_next_page) {
            setPagecnt(1);
            end_cursor =
              response.data.graphql.user.edge_owner_to_timeline_media.page_info
                .end_cursor;
            userid = response.data.graphql.user.id;
            let i = 1;

            while (has_next_page) {
              nextPageResponse = await axios.get(
                `https://instagram.com/graphql/query/?query_id=17888483320059182&id=${userid}&first=62&after=${end_cursor}`
              );
              end_cursor =
                nextPageResponse.data.data.user.edge_owner_to_timeline_media
                  .page_info.end_cursor;

              has_next_page =
                nextPageResponse.data.data.user.edge_owner_to_timeline_media
                  .page_info.has_next_page;

              edges.push(
                nextPageResponse.data.data.user.edge_owner_to_timeline_media
                  .edges
              );
              setQueryData(edges);
              setPagecnt(i);
              i++;
            }
          }
        }
        setData(response.data);
        setIsprivate(response.data.graphql.user.is_private);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [match.url]);

  if (loading && pageCnt == null) {
    return <div>로딩중..</div>;
  } else if (loading && pageCnt !== null) {
    return <div>{pageCnt} 페이지 로딩중...</div>;
  }
  if (match.path.substr(1, 10) !== "postDetail" && error) {
    return (
      <>
        <h1>
          <a href="/">HOME</a>{" "}
          <Link to="/HashTag/블랙핑크">해시태그 검색하기</Link>
        </h1>
        <h2>존재하지 않는 아이디 입니다.</h2>
        {SearchUser}
      </>
    );
  }
  if (isPrivate) {
    return (
      <>
        <h1>
          <a href="/">HOME</a>{" "}
          <Link to="/HashTag/미스코리아">해시태그 검색하기</Link>
        </h1>
        <h2>비공개 아이디는 조회가 불가능합니다.</h2>
        {SearchUser}
      </>
    );
  }
  if (typeof jsonData === "string" || jsonData === null) {
    return (
      <>
        <p>
          <a href="/">HOME</a>
        </p>
        <h2>Error.. (IP 차단됨)</h2>
      </>
    );
  } else if (
    typeof jsonData !== "string" &&
    match.params.shortcode === undefined
  ) {
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
    thumbnails.forEach((test, idx) => {
      if (typeof test === "object") {
        thumbnails[idx] = "";
        test.forEach((image) => {
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

    ovEdges.forEach((edges) => {
      timestamp = new Date(edges.node.taken_at_timestamp * 1000);

      // total 일
      totDateCnt += timestamp.getDate();
      // total 시
      totHoursCnt += timestamp.getHours();
      // total 분
      totMinutesCnt += timestamp.getMinutes();

      // 총 댓글 수
      totCommentCnt += edges.node.edge_media_to_comment.count;
      // 총 좋아요 수
      totLikeCnt += edges.node.edge_media_preview_like.count;
      // 최고 좋아요 수
      if (greatestLikeCntPost < edges.node.edge_media_preview_like.count) {
        greatestLikeCntPost = edges.node.edge_media_preview_like.count;
        greatestLikePostShortcode = edges.node.shortcode;
      }

      // 게시물 imgArr
      imgArr.push(edges.node.thumbnail_src);
      // 게시물 shortcode
      shortcode.push(edges.node.shortcode);
    });

    // 다음페이지가 있을 때 데이터 추가
    if (hasNextPage) {
      queryData.forEach((arr, i) => {
        arr.forEach((edges, j) => {
          timestamp = new Date(edges.node.taken_at_timestamp * 1000);

          // total 일
          totDateCnt += timestamp.getDate();
          // total 시
          totHoursCnt += timestamp.getHours();
          // total 분
          totMinutesCnt += timestamp.getMinutes();

          // 총 댓글 수
          totCommentCnt += edges.node.edge_media_to_comment.count;
          // 총 좋아요 수
          totLikeCnt += edges.node.edge_media_preview_like.count;
          // 최고 좋아요 수
          if (greatestLikeCntPost < edges.node.edge_media_preview_like.count) {
            greatestLikeCntPost = edges.node.edge_media_preview_like.count;
            greatestLikePostShortcode = edges.node.shortcode;
          }

          imgArr.push(edges.node.thumbnail_src);
          shortcode.push(edges.node.shortcode);
        });
      });
    }
    let getPostCnt = shortcode.length;
    avgCommentCnt = totCommentCnt / getPostCnt;
    avgLikeCnt = totLikeCnt / getPostCnt;

    avgDateCnt = totDateCnt / getPostCnt;
    avgHoursCnt = totHoursCnt / getPostCnt;
    avgMinutesCnt = totMinutesCnt / getPostCnt;

    // 팔로워 수
    followedCnt = jsonGraphql[0].edge_followed_by.count;

    // 팔로잉 수
    followingCnt = jsonGraphql[0].edge_follow.count;
  } else if (
    typeof jsonData !== "string" &&
    match.params.shortcode !== undefined
  ) {
    if (jsonData.graphql.user !== undefined) {
      window.location.reload();
    }
    jsonGraphql = Object.values(jsonData.graphql);
    username = jsonGraphql[0].owner.username;
    profileImg = jsonGraphql[0].owner.profile_pic_url;

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

    commentCnt = jsonGraphql[0].edge_media_to_parent_comment.count;

    jsonParentComment = jsonGraphql.map((graphql, idx) => {
      return graphql.edge_media_to_parent_comment.edges;
    });
    ovJsonParentComment = Object.values(jsonParentComment[0]);

    // 댓글
    ovJsonParentComment.forEach((edges, idx) => {
      comments.push({
        id: edges.node.owner.username,
        reply: edges.node.text
      });
    });

    if (!isAlonePost) {
      ovEdges = Object.values(jsonEdges[0]);
      ovEdges.forEach((edges, idx) => {
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
      {SearchUser}
      <br />
      {(function () {
        if (typeof jsonData !== "string" && jsonData !== null) {
          if (match.path === "/") {
            if (searchUsername === undefined) {
              setSearchUsername("sooyaaa__");
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
                match={match}
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
                  avgCommentCnt={avgCommentCnt}
                  avgLikeCnt={avgLikeCnt}
                  greatestLikeCntPost={greatestLikeCntPost}
                  greatestLikePostShortcode={greatestLikePostShortcode}
                  avgDateCnt={avgDateCnt}
                  avgHoursCnt={avgHoursCnt}
                  avgMinutesCnt={avgMinutesCnt}
                />
              </>
            );
          }
        } else {
          return <h2>IP 차단됨</h2>;
        }
      })()}
    </>
  );
}

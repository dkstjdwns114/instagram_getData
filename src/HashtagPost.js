import React, { useEffect, useState } from "react";
import axios from "axios";
import HashtagDetailThumbnails from "./HashtagDetailThumbnails";

export default function HashtagPost({ match }) {
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tagname, setTagname] = useState(match.params.hashtag);
  const [inputValue, setInputValue] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextData, setNextData] = useState(null);

  let jsonGraphql;
  let profileImg;
  let hashTagData;
  let totalPostCnt;
  let ovEdges;
  let thumbnails = [];
  let shortcode = [];

  // pagination
  let nextPageResponse;
  let queryEdges;

  // 인기게시물
  let ovTopEdges;
  let topShortcode = [];
  let topThumbnails = [];

  // 인기게시물 평균
  let topTotLikeCnt = 0;
  let topTotCommentCnt = 0;
  let topTotHashtagCnt = 0;
  let topAvgLike = 0;
  let topAvgComment = 0;
  let topAvgHashtag = 0;
  let topTimestamp = 0;
  let topTotMonthCnt = 0;
  let topTotDateCnt = 0;
  let topTotHoursCnt = 0;
  let topTotMinutesCnt = 0;
  let avgMonth = 0;
  let avgDate = 0;
  let avgHours = 0;
  let avgMinutes = 0;

  // 최근게시물 평균
  let totTextLength = 0;
  let avgText = 0;

  const sendTagname = (e) => {
    if (match.params.hashtag !== inputValue.replace(/#/g, "")) {
      setTagname(inputValue.replace(/#/g, ""));
      setInputValue(tagname);
      document.location.href = `/Hashtag/${inputValue.replace(/#/g, "")}`;
    } else if (match.params.hashtag === inputValue.replace(/#/g, "")) {
      setInputValue(tagname);
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
        const response = await axios.get(
          `https://www.instagram.com/explore/tags/${tagname}/?__a=1`
        );
        let has_next_page =
          response.data.graphql.hashtag.edge_hashtag_to_media.page_info
            .has_next_page;
        if (has_next_page) {
          let end_cursor =
            response.data.graphql.hashtag.edge_hashtag_to_media.page_info
              .end_cursor;
          nextPageResponse = await axios.get(
            `https://www.instagram.com/graphql/query/?query_hash=298b92c8d7cad703f7565aa892ede943&variables={"tag_name":"${tagname}","first":70,"after":"${end_cursor}"}
            `
          );
          setHasNextPage(has_next_page);
        }
        setData(response.data);
        if (has_next_page) {
          setNextData(nextPageResponse.data);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
      setInputValue(tagname);
    };
    fetchUsers();
  }, [tagname]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error.. (IP 차단됨)</div>;
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

    // 게시물 Img, shortcode
    ovEdges.forEach((edges) => {
      shortcode.push(edges.node.shortcode);
      thumbnails.push(edges.node.thumbnail_src);

      if (edges.node.edge_media_to_caption.edges.length) {
        totTextLength +=
          edges.node.edge_media_to_caption.edges[0].node.text.length;
      }
    });

    // 다음페이지가 있을 때 데이터 추가
    if (hasNextPage) {
      queryEdges = nextData.data.hashtag.edge_hashtag_to_media.edges;
      queryEdges.forEach((edges) => {
        shortcode.push(edges.node.shortcode);
        thumbnails.push(edges.node.thumbnail_src);

        if (edges.node.edge_media_to_caption.edges.length) {
          totTextLength +=
            edges.node.edge_media_to_caption.edges[0].node.text.length;
        }
      });
    }
    let getDataCnt = shortcode.length;
    avgText = totTextLength / getDataCnt;

    // ---- 인기게시물 ----
    ovTopEdges = Object.values(hashTagData.edge_hashtag_to_top_posts.edges);

    // 인기게시물 Img, shortcode
    ovTopEdges.forEach((edges) => {
      topTotLikeCnt += edges.node.edge_media_preview_like.count;
      topTotCommentCnt += edges.node.edge_media_to_comment.count;
      topShortcode.push(edges.node.shortcode);
      topThumbnails.push(edges.node.thumbnail_src);

      topTimestamp = new Date(edges.node.taken_at_timestamp * 1000);

      topTotMonthCnt += topTimestamp.getMonth();
      topTotDateCnt += topTimestamp.getDate();
      topTotHoursCnt += topTimestamp.getHours();
      topTotMinutesCnt += topTimestamp.getMinutes();

      if (edges.node.edge_media_to_caption.edges.length) {
        let topText = edges.node.edge_media_to_caption.edges[0].node.text;
        let tagslistarr = topText.match(/(^|\s)#([^ ]*)/g);
        if (tagslistarr !== null) {
          topTotHashtagCnt += tagslistarr.length;
        }
      }
    });

    let getTopCnt = topShortcode.length;

    topAvgLike = topTotLikeCnt / getTopCnt;
    topAvgComment = topTotCommentCnt / getTopCnt;

    avgMonth = topTotMonthCnt / getTopCnt;
    avgDate = topTotDateCnt / getTopCnt;
    avgHours = topTotHoursCnt / getTopCnt;
    avgMinutes = topTotMinutesCnt / getTopCnt;

    topAvgHashtag = topTotHashtagCnt / getTopCnt;
  }

  return (
    <div>
      <>
        <h1>
          <a href="/">HOME</a>
        </h1>
        <h4>이미지 클릭시 해당 게시물 상세페이지로 이동합니다.</h4>
        <p>↓검색하고싶은 태그를 입력하세요↓</p>
        <p>
          <input
            type="text"
            name="hashTag"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={onEnterPress}
            placeholder="# 제외 단어를 입력하세요"
          />
          <input type="button" value="Submit" onClick={sendTagname} />
        </p>
        <img src={profileImg} alert="태그 프로필" /> ←
        <span>
          {" "}
          HASHTAG #<a href="#">{tagname}</a> 의 대표 이미지
        </span>
        <p>총 게시물 수 : {totalPostCnt}개</p>
        <hr />
        <p>-- 인기게시물 --</p>
        <p>받아온 게시물 : {topShortcode.length}개</p>
        <p>* 받아온 게시물 기준 *</p>
        <p>평균 좋아요 : {topAvgLike.toFixed(1)}개</p>
        <p>평균 댓글 : {topAvgComment.toFixed(1)}개</p>
        <p>평균 작성 시각(월) : {avgMonth.toFixed(0)}월</p>
        <p>평균 작성 시각(일) : {avgDate.toFixed(0)}일</p>
        <p>평균 작성 시각(시) : {avgHours.toFixed(0)}시</p>
        <p>평균 작성 시각(분) : {avgMinutes.toFixed(0)}분</p>
        <p>평균 해시태그 갯수 : {topAvgHashtag.toFixed(0)}개</p>
        <HashtagDetailThumbnails
          imgArr={topThumbnails}
          shortcode={topShortcode}
        />
        <hr />
        <p>-- 최근게시물 --</p>
        <p>받아온 게시물 : {shortcode.length}개</p>
        <p>* 받아온 게시물 기준 *</p>
        <p>평균 본문 글자 수 : {avgText.toFixed(0)}자</p>
        <HashtagDetailThumbnails imgArr={thumbnails} shortcode={shortcode} />
      </>
    </div>
  );
}

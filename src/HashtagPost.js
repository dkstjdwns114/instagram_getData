import React, { useEffect, useState } from "react";
import axios from "axios";
import HashtagDetailThumbnails from "./HashtagDetailThumbnails";

export default function HashtagPost({ match }) {
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tagname, setTagname] = useState("수영복");
  const [inputValue, setInputValue] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextData, setNextData] = useState(null);

  let jsonGraphql;
  let profileImg;
  let hashTagData;
  let totalPostCnt;
  let ovEdges;
  let thumbnails;
  let shortcode = [];

  // pagination
  let nextPageResponse;
  let has_next_page = false;
  let end_cursor;
  let queryEdges;

  // 인기게시물
  let ovTopEdges;
  let topShortcode = [];
  let topThumbnails;

  const sendTagname = (e) => {
    setTagname(inputValue);
    setInputValue(tagname);
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
        has_next_page =
          response.data.graphql.hashtag.edge_hashtag_to_media.page_info
            .has_next_page;
        if (has_next_page) {
          end_cursor =
            response.data.graphql.hashtag.edge_hashtag_to_media.page_info
              .end_cursor;
          nextPageResponse = await axios.get(
            `https://www.instagram.com/graphql/query/?query_hash=298b92c8d7cad703f7565aa892ede943&variables={"tag_name":"${tagname}","first":50,"after":"${end_cursor}"}
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

    // 게시물 Img, shortcode
    thumbnails = ovEdges.map((test, index) => {
      shortcode.push(test.node.shortcode);
      return test.node.thumbnail_src;
    });

    // 다음페이지가 있을 때 데이터 추가
    if (hasNextPage) {
      queryEdges = nextData.data.hashtag.edge_hashtag_to_media.edges;
      queryEdges.map((edges, idx) => {
        shortcode.push(edges.node.shortcode);
        thumbnails.push(edges.node.thumbnail_src);
      });
    }

    // ---- 인기게시물 ----
    ovTopEdges = Object.values(hashTagData.edge_hashtag_to_top_posts.edges);

    // 인기게시물 Img, shortcode
    topThumbnails = ovTopEdges.map((test, index) => {
      topShortcode.push(test.node.shortcode);
      return test.node.thumbnail_src;
    });
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
        <span> #{tagname} 의 대표 이미지</span>
        <p>총 게시물 수 : {totalPostCnt}개</p>
        <hr />
        <p>-- 인기게시물 --</p>
        <HashtagDetailThumbnails
          imgArr={topThumbnails}
          shortcode={topShortcode}
        />
        <hr />
        <p>-- 최근게시물 --</p>
        <HashtagDetailThumbnails imgArr={thumbnails} shortcode={shortcode} />
      </>
    </div>
  );
}

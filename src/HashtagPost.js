import React, { useEffect, useState } from "react";
import axios from "axios";
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
  let textEdges;
  let ovTextEdges;
  let thumbnailText;
  let tnContents;
  let shortcode = [];

  // 인기게시물
  let ovTopEdges;
  let topShortcode = [];
  let topThumbnails;
  let topTextEdges;
  let topOvTextEdges;
  let topThumbnailText;
  let topTnContents;

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

      setTagname(inputValue);
      setInputValue(tagname);
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

    // 게시물 Img, shortcode
    thumbnails = ovEdges.map((test, index) => {
      shortcode.push(test.node.shortcode);
      return test.node.thumbnail_src;
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

    // ---- 인기게시물 ----
    ovTopEdges = Object.values(hashTagData.edge_hashtag_to_top_posts.edges);

    // 인기게시물 Img, shortcode
    topThumbnails = ovTopEdges.map((test, index) => {
      topShortcode.push(test.node.shortcode);
      return test.node.thumbnail_src;
    });

    topTextEdges = ovTopEdges.map((edges) => {
      return edges.node.edge_media_to_caption.edges;
    });
    topOvTextEdges = Object.values(topTextEdges);
    topThumbnailText = topOvTextEdges.map((text, idx) => {
      return text[0];
    });

    // 인기게시물 Text
    topTnContents = topThumbnailText.map((real, idx) => {
      if (real === undefined) {
        return "";
      } else {
        return real.node.text;
      }
    });
  }

  return (
    <div>
      <>
        <p>태그 파싱</p>
        <h1>
          <a href="/">HOME</a>
        </h1>
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
        <img src={profileImg} alert="태그 프로필" />
        <p>총 게시물 수 : {totalPostCnt}개</p>
        <p>-- 인기게시물 --</p>
        <HashtagDetailThumbnails
          imgArr={topThumbnails}
          shortcode={topShortcode}
        />
        <p>-- 최근게시물 --</p>
        <HashtagDetailThumbnails imgArr={thumbnails} shortcode={shortcode} />
      </>
    </div>
  );
}

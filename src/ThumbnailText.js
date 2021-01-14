import React, { useEffect, useState } from "react";

export default function ThumbnailText({ content }) {
  const [text, setText] = useState(null);
  const [tagCnt, setTagcnt] = useState(0);
  let words;

  useEffect(() => {
    let tagslistarr;
    words = content;
    tagslistarr = words.match(/(^|\s)#([^ ]*)/g);
    if (tagslistarr === null) {
      setText(content);
    } else {
      setTagcnt(tagslistarr.length);
      tagslistarr.forEach((tag, idx) => {
        let temp = tag.trim();
        words = words.replace(
          temp,
          `<a href='/HashTag/${temp.substr(1)}'>${temp}</a>`
        );
        setText(words);
      });
    }
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
      <hr />
      <p>해시태그 갯수 : 총 {tagCnt}개</p>
    </>
  );
}

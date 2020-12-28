import React from "react";
import AxiosData from "./AxiosData";

export default function Username({ match }) {
  return (
    <>
      <input type="text" name="username" placeholder="아이디를 입력하세요" />
      <input type="submit" value="Submit" />
      <AxiosData match={match} />
    </>
  );
}

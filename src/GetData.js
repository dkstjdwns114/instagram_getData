import React from "react";

export default function GetData({ jsonData }) {
  let jsonGraphql = Object.values(jsonData.graphql);
  let jsonEdges = jsonGraphql.map((graphql, idx) => {
    return graphql.edge_owner_to_timeline_media.edges;
  });
  let obEdges = Object.values(jsonEdges[0]);
  let imgArr = obEdges.map((edges) => {
    return edges.node.display_url;
  });

  return (
    <div>
      {imgArr.map((imgUrl, idx) => {
        return <img src={imgUrl} id={idx} />;
      })}
    </div>
  );
}

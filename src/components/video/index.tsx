import React from "react";
import "./index.less";

export default function VideoComponent() {
  return <img style={{ width: "100%" }} src={require("./video-poster.png")} />;
  return (
    <video
      className="comp-video"
      poster={require("./video-poster.png")}
      src="https://www.w3school.com.cn/i/movie.ogg"
      controls={false}
    />
  );
}

import React, { useContext, useEffect, useRef } from "react";
import "video-react/dist/video-react.css";
// @ts-ignore
import { Player, BigPlayButton } from "video-react";
import "./index.less";
import { GlobalSettingContext, IGlobalSettingContext } from "../../context";
let isFullScreen = false;
export default function VideoComponent(props: {
  src: "";
  poster?: "";
  className?: string;
}) {
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  const playerRef = useRef(null);
  const { src, poster = "", className } = props;
  // return <img className="comp-video" src={require("./video-poster.png")} />;
  function handleStateChange(state: any, preState: any) {
    if (!preState.hasStarted && state.hasStarted && !isFullScreen) {
      isFullScreen = true;
      if (!isMobile) {
        (playerRef.current as any).toggleFullscreen();
      }
    }
  }
  return (
    <Player
      preload={"none"}
      poster={require("./res/poster.png")}
      ref={(player: any) => {
        if (player) {
          (playerRef.current as any) = player;
          (playerRef.current as any).subscribeToStateChange(handleStateChange);
        }
      }}
      src={src}
      className={`${className ? className : ""} comp-video`}
      height="100px"
      fluid={false}
    >
      <BigPlayButton position={"center"} />
    </Player>
  );
  return (
    <video
      className={`${className ? className : ""} comp-video`}
      poster={poster}
      src={src}
      controls={true}
    />
  );
}

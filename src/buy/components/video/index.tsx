import React, { useContext, useEffect, useRef, useState } from "react";
import "video-react/dist/video-react.css";
// @ts-ignore
import { Player, BigPlayButton } from "video-react";
import "./index.less";
import { GlobalSettingContext, IGlobalSettingContext } from "../../context";
import { isServer } from "../../common/utils/util";
import { RenderByCondition } from "../RenderByCondition";
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
        // (playerRef.current as any).toggleFullscreen();
      }
    }
  }
  const [randomKey, setRandomKey] = useState(1);
  useEffect(() => {
    if (!isServer()) {
      const ref = window.setInterval(() => {
        // @ts-ignore
        setRandomKey(randomKey => {
          if (randomKey > 0) {
            window.clearInterval(ref);
          } else {
            const next = randomKey + 1;
            return next;
          }
        });
      }, 1000);
    }
  }, []);
  return (
    <RenderByCondition
      ComponentMb={
        <Player
          key={randomKey}
          preload={"none"}
          poster={poster}
          autoPlay={true}
          muted={true}
          className={className}
          ref={(player: any) => {
            if (player) {
              (playerRef.current as any) = player;
              (playerRef.current as any).subscribeToStateChange(
                handleStateChange
              );
            }
          }}
          src={src}
          fluid={true}
        >
          <BigPlayButton position={"center"} />
        </Player>
      }
      ComponentPc={
        <Player
          className={className}
          autoPlay={true}
          muted={true}
          key={randomKey}
          ref={(player: any) => {
            if (player) {
              (playerRef.current as any) = player;
              (playerRef.current as any).subscribeToStateChange(
                handleStateChange
              );
            }
          }}
          src={src}
          fluid={true}
        >
          <BigPlayButton position={"center"} />
        </Player>
      }
    />
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

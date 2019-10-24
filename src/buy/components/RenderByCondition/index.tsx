import React, { useContext } from "react";
import { GlobalSettingContext, IGlobalSettingContext } from "../../context";

interface IRenderByCondition {
  ComponentMb?: any;
  ComponentPc?: any;
  ComponentServer?: any;
}
export function RenderByCondition(props: IRenderByCondition) {
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  const { ComponentMb, ComponentPc, ComponentServer } = props;
  const isServer = process.env.SSR_SERVER;
  // 当时服务端的时候.
  if (isServer && ComponentServer) {
    return ComponentServer;
  }
  if (isMobile && ComponentMb) {
    return ComponentMb;
  } else {
    if (ComponentPc) {
      return ComponentPc;
    } else {
      return null;
    }
  }
}

import React, { useEffect } from "react";
import {isServer} from "@/utils/util";

export default function DocumentTitle(props: any) {
  const { children, title } = props;
  useEffect(() => {
    if (!isServer() && title) {
      document.title = title
    }
  }, []);
  return children;
}

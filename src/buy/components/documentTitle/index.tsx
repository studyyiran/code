import React, { useEffect } from "react";
import { isServer } from "buy/common/utils/util";
export default function hocDocumentTitle(Component: any) {
  return (title: string) => {
    return (props: any) => {
      useEffect(() => {
        if (!isServer() && title) {
          document.title = title;
        }
      }, []);
      return <Component {...props} />;
    };
  };
}

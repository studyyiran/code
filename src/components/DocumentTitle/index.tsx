import React, { useEffect } from "react";

export default function DocumentTitle(props: any) {
  const { children, title } = props;
  useEffect(() => {
    console.log(title)
  }, []);
  return children;
}

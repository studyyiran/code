import * as moment from "moment-timezone";
import * as React from "react";
import "./index.less";
import RouterLink from "@/components/routerLink";

export default function Blog(props: any) {
  const { slug, thumbnailFullUrl, title, releaseDt, summary } = props;
  return (
    <RouterLink className="blog-card-comp common-link" to={"/" + slug}>
      <img src={thumbnailFullUrl} alt={thumbnailFullUrl + " | UpTradeit.com"} />
      <section className="blog-intro">
        <header className="title">
          <h3>{title}</h3>
          <span className="date">
            {moment.tz(releaseDt, "America/Chicago").format("MMM DD, YYYY")}
          </span>
        </header>
        <p>{summary}</p>
      </section>
    </RouterLink>
  );
}

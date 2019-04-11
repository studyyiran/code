import { RouteComponentProps } from 'react-router-dom'
export interface IBlogListState {
  translate: boolean
}

export interface IBlogStore {
  features: IBlog[];
  tagPageList: IBlog[];
  tags: ITag[];
  lastest: IBlog[];
  activeTag: ITag | null;
  lastestPagination: IPagination;
  tagPageListPagination: IPagination;
  currentTag: string;
  viewTagMore: boolean;
  viewLastestMore: boolean;
  detail: IBlog | null;
  getPageDetail: (slug: string) => Promise<boolean>;
  getTagList: () => Promise<boolean>;
  getFeatureList: () => Promise<boolean>;
  getTagPageList: (param?: IPagination) => Promise<boolean>;
  getLastestList: () => Promise<boolean>;
  destory: () => void;
}

export interface IBlogListProps extends RouteComponentProps<{ tag: string }> {
  blog: IBlogStore
}

export interface IBlogDetailProps extends RouteComponentProps<{ slug: string }> {
  blog: IBlogStore
}
export interface IBlog {
  title: string;
  summary: string;
  thumbnailFullUrl: string;
  releaseDt: string;
  seoDesc: string;
  seoKeywords: string;
  seoRobots: string;
  slug: string;
  tags: ITag[];
  content: string;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
}

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  tagSlug?: string;
  featured?: boolean;
}
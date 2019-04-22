import { observable, action, autorun, computed } from 'mobx';
import * as Api from '../api/blog.api';
import { IBlog, IBlogStore, ITag, IPagination } from '../interface/blog.interface'
import { IRequestResWithPage } from '@/utils/request.interface';


// enum ERobots {
//   INDEX_FOLLOW = "index,follow",
//   INDEX_NOFOLLOW = "index,nofollow",
//   NOINDEX_FOLLOW = "noindex,follow",
//   NOINDEX_NOFOLLOW = "noindex,nofollow"
// }

class Blog implements IBlogStore {
  @observable public features: IBlog[] = [];
  @observable public tags: ITag[] = [];
  @observable public tagPageList: IBlog[] = [];
  @observable public lastest: IBlog[] = [];
  @observable public detail: IBlog | null = null;
  @observable public activeTag: ITag | null = null;
  @observable public tagPageListPagination: IPagination = {
    tagSlug: '',
    pageIndex: 0,
    pageSize: 3,
  }
  @observable public lastestPagination: IPagination = {
    pageIndex: 0,
    pageSize: 10,
  }
  @observable public viewTagMore: boolean = true;
  @observable public viewLastestMore: boolean = true;

  constructor() {
    autorun(() => {
      if (this.activeTag) {
        this.tagPageListPagination.tagSlug = this.activeTag.slug;
        this.getTagPageList();
      }
    })
  }

  @computed get currentTag() {
    const page = this.tagPageList[0];
    if (page) {
      const tag = page.tags.find((v: ITag) => v.slug === this.tagPageListPagination.tagSlug);
      return tag ? tag.name : ''
    }
    return '';
  }

  @action public getFeatureList = async () => {
    const params = {
      featured: true,
      pageIndex: 0,
      pageSize: 3
    }
    try {
      this.features = await Api.getPageList<IBlog[]>(params);
    } catch (e) {
      console.warn(e);
      return false;
    }
    return true;
  }

  @action public getTagPageList = async (param?: IPagination) => {
    const params = {
      ...this.tagPageListPagination,
      ...param,
    }
    let result: IRequestResWithPage<IBlog[]> | null = null;
    try {
      result = await Api.getPageList<IRequestResWithPage<IBlog[]>>(params, true);
    } catch (e) {
      console.warn(e);
      return false;
    }
    if (result) {
      if (result.page === 0) {
        this.tagPageList = result.data;
      } else {
        this.tagPageList = [...this.tagPageList, ...result.data];
      }
      if (result.totalCount <= (result.page + 1) * result.pageSize) {
        this.viewTagMore = false;
      }
    }

    return true;
  }

  @action public getLastestList = async () => {
    const params = {
      ...this.lastestPagination
    }
    let result: IRequestResWithPage<IBlog[]> | null = null;
    try {
      result = await Api.getPageList<IRequestResWithPage<IBlog[]>>(params, true);
    } catch (e) {
      console.warn(e);
      return false;
    }

    if (result) {
      if (result.page === 0) {
        this.lastest = result.data;
      } else {
        this.lastest = [...this.lastest, ...result.data];
      }
      if (result.totalCount <= (result.page + 1) * result.pageSize) {
        this.viewLastestMore = false;
      }
    }

    return true;
  }

  @action public getTagList = async () => {
    try {
      this.tags = await Api.getTagList<ITag[]>();
    } catch (e) {
      console.warn(e);
      return false;
    }

    // 默认拉一次tag 第0 个的 pagelist
    if (this.tags.length > 0) {
      this.activeTag = this.tags[0];
    }
    return true;
  }

  @action public getPageDetail = async (slug: string) => {
    try {
      this.detail = await Api.getPageDetail<IBlog>(slug);
    } catch (e) {
      console.warn(e);
      // if (e.code === 110000005) {
      //  // window['__history__'].replace('/notfound');
      //   // RedirectComponent('/notfound');
      // }
      return false;
    }
    // this.detail.seoRobots = ERobots[this.detail.seoRobots];
    return true;
  }

  @action public destory = () => {
    this.viewTagMore = true;
    this.tags = [];
    this.tagPageList = [];
    this.lastest = [];
    this.features = [];
    this.activeTag = null;
    this.tagPageListPagination = {
      tagSlug: '',
      pageIndex: 0,
      pageSize: 3,
    }
    this.lastestPagination = {
      pageIndex: 0,
      pageSize: 10,
    }
  }
}

export default new Blog();
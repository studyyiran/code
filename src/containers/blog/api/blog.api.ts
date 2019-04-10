import { Request } from "utils";
import { IOpts } from "@/utils/request.interface";
import { IPagination } from '../interface/blog.interface';

export const getPageList = <T>(params: IPagination, getAll?: boolean) => {
  const opts: IOpts = {
    url: `/cms-pages/search`,
    method: 'POST',
    params,
    getAll: getAll || false
  };

  return Request<T>(opts);
};

export const getTagList = <T>() => {
  const opts: IOpts = {
    url: `/cms-tags/all`,
  };

  return Request<T>(opts);
};

export const getPageDetail = <T>(slug: string) => {
  const opts: IOpts = {
    url: `/cms-pages/${slug}`,
  };

  return Request<T>(opts);
};
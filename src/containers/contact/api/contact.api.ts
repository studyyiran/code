import { Request } from "utils";
import { IOpts } from '@/utils/request.interface';
import { IContact } from '../interface/contact.interface';

// 获取订单详情
export function onSubmit<T>(item: IContact): Promise<T> {
  const opts: IOpts = {
    method: "POST",
    url: `/message_books`,
    params: item,
    loading: true,
    isMock: true
  };

  return Request<T>(opts);
}
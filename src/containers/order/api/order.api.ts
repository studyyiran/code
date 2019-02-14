import { Request } from "utils";
import { IOpts } from '@/utils/request.interface';

// 获取订单详情
export function getOrderDetail<T>(orderNo: string = "1001"): Promise<T> {
    const opts: IOpts = {
        method: "POST",
        url: `/orders/check`,
        params: {
            orderNo
        },
        loading: true,
        isMock: true
    };

    return Request<T>(opts);
}
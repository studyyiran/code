import React, { useContext, useEffect } from "react";
import ProductDetail from "./index";
import {
  IProductDetailContext,
  ProductDetailContext,
  storeDetailActionTypes
} from "./context";
import { getProductDetailByToken } from "./server";
import { Message } from "../../components/message";
import { callBackWhenPassAllFunc } from "../../common/utils/util";
import {UseGetParams} from "../../common-modules/commonUseHook";

export default function DetailPreviewWrapper(props: any) {
  // @ts-ignore
  const { token } = UseGetParams();
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextDispatch
  } = productDetailContext as IProductDetailContext;

  useEffect(() => {
    // 第一次进入页面的时候调用 有token调用
    callBackWhenPassAllFunc([() => token], startTokenToDetail);
  }, []);

  async function startTokenToDetail() {
    try {
      // @ts-ignore
      const detail = await getProductDetailByToken(token);
      productDetailContextDispatch({
        type: storeDetailActionTypes.setProductDetail,
        value: detail
      });
    } catch (e) {
      // 刷新并报错
      // const fake ={"buyProductId":2,"buyProductCode":"56566247rg","categoryId":1,"categoryDisplayName":"Phone","brandId":2,"brandDisplayName":"Samsung","productId":1,"productDisplayName":"iPhone XS Max","skuId":1,"buyProductBQV":"[{\"bpName\":\"Storage\",\"bpSort\":\"1\",\"bpvName\":\"64GB\",\"tag\":\"\"},{\"bpName\":\"Carrier\",\"bpSort\":\"2\",\"bpvName\":\"AT&T\",\"tag\":\"QUICKFILTERBUY\"},{\"bpName\":\"Color\",\"bpSort\":\"3\",\"bpvName\":\"Gold\",\"tag\":\"ISCOLOR\"}]","buyProductStatus":"INTRANSACTION","buyLevel":"NULL","buyPrice":567,"skuPrice":1099,"buyProductImgPc":"https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/web/1570501390813_e35ee2d9b6d14e1c862ae71c5dcc5884.jpg,https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/web/1570501390813_b0c445d6cd2945588fefdc8a3eb97376.jpg,https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/web/1570501390813_433ab876b19949c5aa32122c7cddca2f.jpg","buyProductImgM":"https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/mob/1570501390813_e35ee2d9b6d14e1c862ae71c5dcc5884.jpg,https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/web/1570501390813_b0c445d6cd2945588fefdc8a3eb97376.jpg,https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/web/1570501390813_433ab876b19949c5aa32122c7cddca2f.jpg","buyProductVideo":"5","buyProductDate":"","buyProductBatteryLife":"","buyProductHistoryPdf":"","buyProductRemark":"","productDescription":"<table style=\"width: 144pt;\" border=\"0\" width=\"192\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr style=\"height: 345.6pt;\">\n<td class=\"xl63\" style=\"height: 345.6pt; width: 48pt;\" width=\"64\" height=\"461\" data-sheets-value=\"{&quot;1&quot;:2,&quot;2&quot;:&quot;What's in the box?\\n- Phone\\n- Charger\\n\\nWeight: 208 g\\n\\nWidth: 77.4 mm\\nDepth: 7.7 mm\\nHeight: 157.5 mm&quot;}\" data-sheets-formula=\"=&quot;What's in the box?\n- Phone\n- Charger\n\nWeight: &quot;&amp;R[0]C[16]&amp;&quot; g\n\nWidth: &quot;&amp;R[0]C[17]&amp;&quot; mm\nDepth: &quot;&amp;R[0]C[18]&amp;&quot; mm\nHeight: &quot;&amp;R[0]C[19]&amp;&quot; mm&quot;\">What's in the box?<br />- Phone<br />- Charger<br /><br />Weight: 208 g<br /><br />Width: 77.4 mm<br />Depth: 7.7 mm<br />Height: 157.5 mm</td>\n<td class=\"xl63\" style=\"width: 48pt;\" width=\"64\" data-sheets-value=\"{&quot;1&quot;:2,&quot;2&quot;:&quot;Release Date: Sep 2018\\n\\nScreen Size: 6.5 inches\\nScreen Resolution: 2688 x 1242\\nPPI: 458\\nDisplay Refresh: 60 Hz\\n\\nRear Camera: 12MP + 12MP\\nFront Camera: 7MP + ToF&quot;}\" data-sheets-formula=\"=&quot;Release Date: &quot;&amp;Text(R[0]C[3],&quot;MMM YYYY&quot;)&amp;&quot;\n\nScreen Size: &quot;&amp;R[0]C[6]&amp;&quot; inches\nScreen Resolution: &quot;&amp;R[0]C[7]&amp;&quot;\nPPI: &quot;&amp;R[0]C[8]&amp;&quot;\nDisplay Refresh: &quot;&amp;R[0]C[9]&amp;&quot; Hz\n\nRear Camera: &quot;&amp;R[0]C[12]&amp;&quot;\nFront Camera: &quot;&amp;R[0]C[13]\">Release Date: Sep 2018<br /><br />Screen Size: 6.5 inches<br />Screen Resolution: 2688 x 1242<br />PPI: 458<br />Display Refresh: 60 Hz<br /><br />Rear Camera: 12MP + 12MP<br />Front Camera: 7MP + ToF</td>\n<td class=\"xl63\" style=\"width: 48pt;\" width=\"64\" data-sheets-value=\"{&quot;1&quot;:2,&quot;2&quot;:&quot;Processor: A12 Bionic\\n\\nBattery: 3174 mAh\\nWireless Charging: Yes\\nFast Charging: Yes\\n\\nWater Resistant: IP68&quot;}\" data-sheets-formula=\"=&quot;Processor: &quot;&amp;R[0]C[9]&amp;&quot;\n\nBattery: &quot;&amp;R[0]C[24]&amp;&quot; mAh\nWireless Charging: &quot;&amp;R[0]C[18]&amp;&quot;\nFast Charging: &quot;&amp;R[0]C[19]&amp;&quot;\n\nWater Resistant: &quot;&amp;R[0]C[22]\">Processor: A12 Bionic<br /><br />Battery: 3174 mAh<br />Wireless Charging: Yes<br />Fast Charging: Yes<br /><br />Water Resistant: IP68</td>\n</tr>\n</tbody>\n</table>"}
      // productDetailContextDispatch({
      //   type: storeDetailActionTypes.setProductDetail,
      //   value: fake
      // });
      console.error(e);
      Message.error("token out of time");
    }
  }

  return <ProductDetail {...props} />;
}

export function modelFilterAttr(info: any) {
  if (info) {
    const { productDisplayName, productId, brandId } = info;
    return {
      id: productId,
      displayName: productDisplayName,
      brandId
    };
  } else {
    return {};
  }
}

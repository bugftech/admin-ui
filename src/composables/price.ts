// usePriceYuan 将价格分转换成元
export function usePriceYuan(price: number): string {
  return (price / 100).toFixed(2) + "元";
}

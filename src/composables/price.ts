import { customRef, ref } from "vue";

// usePriceYuan 将价格分转换成元
export function usePriceYuan(price: number): string {
  return (price / 100).toFixed(2) + "元";
}

// usePriceRef custom ref
export function usePriceRef(initialValue: number, times = 100) {
  const valueRef = ref(initialValue);

  const priceRef = customRef((track, trigger) => {
    return {
      get() {
        track();
        return valueRef.value / times;
      },
      set(newValue) {
        const newPrice = newValue * times;
        valueRef.value = newPrice;
        trigger();
      },
    };
  });

  return priceRef;
}

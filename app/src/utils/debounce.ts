export const debounce = (timeout: number) => {
  let t: any = null;

  return (fn: () => void) => {
    if (t) {
      clearTimeout(t);
    }

    t = setTimeout(() => {
      fn();
    }, timeout);
  };
};

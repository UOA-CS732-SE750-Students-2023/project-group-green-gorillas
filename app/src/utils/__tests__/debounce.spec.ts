import { debounce } from "../debounce";

describe("debounce", () => {
  jest.useFakeTimers();

  it("should call the function once after the timeout has elapsed", () => {
    const fn = jest.fn();
    const debouncedFn = debounce(100);

    debouncedFn(fn);

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(50);

    debouncedFn(fn);

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toBeCalledTimes(1);
  });

  it("should clear the timeout if called multiple times within the timeout period", () => {
    const fn = jest.fn();
    const debouncedFn = debounce(100);

    debouncedFn(fn);

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(50);

    debouncedFn(fn);

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(50);

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toBeCalledTimes(1);
  });
});

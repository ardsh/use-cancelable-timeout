import {renderHook, act} from "react-hooks-testing-library";

import {useCancelableTimeout} from "../index";

function createCancelableTimeout(callback, timeout = 300) {
  const {result, rerender, waitForNextUpdate} = renderHook(
    ({callback, timeout}) => useCancelableTimeout(callback, timeout),
    {
      initialProps: {
        callback,
        timeout,
      },
    },
  );
  const changeArgs = (cb, time = 150) =>
    rerender({
      callback: cb,
      timeout: time,
    });
  return {
    changeArgs,
    result,
  };
}
jest.useFakeTimers();
describe("useCancelableTimeout", () => {
  it("should return stable, unchanged functions", async () => {
    const first = jest.fn();
    const second = jest.fn();
    const {result, changeArgs} = createCancelableTimeout(first, 150);
    const [firstExecute, cancel] = result.current;

    changeArgs(second, 2500);
    act(() => result.current[0]());
    expect(firstExecute).toEqual(result.current[0]);
    expect(cancel).toEqual(result.current[1]);
    expect(first).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(second).toHaveBeenCalled();
  });
  it("should not call the callback if canceled", () => {
    const first = jest.fn();
    const {result} = createCancelableTimeout(first, 200);
    const [execute, cancel] = result.current;
    act(execute);
    act(cancel);
    jest.runAllTimers();
    expect(first).not.toHaveBeenCalled();
    act(execute);
    jest.runAllTimers();
    expect(first).toHaveBeenCalled();
  });
  it("should call the latest callback when switched mid-timer", () => {
    const first = jest.fn();
    const second = jest.fn();
    const {result, changeArgs} = createCancelableTimeout(first, 250);
    const [execute] = result.current;
    act(execute);
    changeArgs(second, 200);
    jest.runAllTimers();
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalled();
  });
});

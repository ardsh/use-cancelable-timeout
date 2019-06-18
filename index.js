import React from "react";

export function useRefBox(value) {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
export function useCancelableTimeout(callback, timeout) {
  const timer = React.useRef();
  const savedCallback = useRefBox(callback);
  const savedTimeout = useRefBox(timeout);
  const execute = React.useCallback(() => {
    function tick() {
      savedCallback.current();
    }
    timer.current = setTimeout(tick, savedTimeout.current);
  }, [savedTimeout, savedCallback]);
  const cancel = React.useCallback(() => {
    clearTimeout(timer.current);
  }, []);
  return React.useMemo(() => [execute, cancel], [execute, cancel]);
}

export default useCancelableTimeout;

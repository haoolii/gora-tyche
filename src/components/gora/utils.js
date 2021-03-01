import { useRef, useEffect, useCallback, useLayoutEffect } from 'react';

export function useEventCall(fn) {
  const ref = useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback(
    (...args) =>
      // @ts-expect-error hide `this`
      // tslint:disable-next-line:ban-comma-operator
      (0, ref.current)(...args),
    []
  );
}

export const usePrevious = (cb) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = cb();
  });

  return ref.current;
};

export const useChange = (cb) => {
  const previous = usePrevious(cb);
  const current = cb();
  return current !== undefined && current !== previous;
};

/**
 * 節流，是一種減緩事件觸發方法
 * @param {需要執行的函式}} fn
 * @param {時間間隔} wait
 */
export const throttle = (fn, wait = 16) => {
  let previous = 0;
  return (...args) => {
    let now = Date.now();
    if (now - previous > wait) {
      previous = now;
      fn.apply(this, args);
    }
  };
};

export function twoDateDurationDay(startDate, endDate) {
  let duration_time = Math.abs(endDate.getTime() - startDate.getTime());
  let duration_days = duration_time / (1000 * 3600 * 24);
  return Math.round(duration_days);
}

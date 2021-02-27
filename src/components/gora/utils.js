import { useRef, useEffect, useCallback,useLayoutEffect } from 'react';
// export const useEventCall = (cb) => {
//   const ref = useRef(cb);
//   ref.current = cb;
//   return useCallback(
//     () => {
//       ref.current()
//     },
//     [],
//   ) ;
// };

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

// fn 是需要执行的函数
// wait 是时间间隔
export const throttle = (fn, wait = 16) => {
  // 上一次执行 fn 的时间
  let previous = 0;
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date();
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
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

export function once(fn, replacer = null) {
  return function (...args) {
    if(fn) {
      const ret = fn.apply(this, args);
      fn = null;
      return ret;
    }
    if(replacer) {
      return replacer.apply(this, args);
    }
  };
}

export function throttle(fn, ms = 100) {
  let throttleTimer = null;
  return function (...args) {
    if(!throttleTimer) {
      const ret = fn.apply(this, args);
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, ms);
      return ret;
    }
  };
}

export function debounce(fn, ms) {
  let debounceTimer = null;
  return function (...args) {
    if(debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

export function deprecate(fn, oldApi, newApi) {
  const message = `The ${oldApi} is deprecated.
Please use the ${newApi} instead.`;
  const notice = once(console.warn);

  return function (...args) {
    notice(message);
    return fn.apply(this, args);
  };
}

export function intercept(fn, {beforeCall = null, afterCall = null}) {
  return function (...args) {
    if(!beforeCall || beforeCall.call(this, args) !== false) {
      // 如果beforeCall返回false，不执行后续函数
      const ret = fn.apply(this, args);
      if(afterCall) return afterCall.call(this, ret);
      return ret;
    }
  };
}

export function batch(fn) {
  return function (subject, ...args) {
    if(Array.isArray(subject)) {
      return subject.map((s) => {
        return fn.call(this, s, ...args);
      });
    }
    return fn.call(this, subject, ...args);
  };
}

export function continous(reducer) {
  return function (...args) {
    return args.reduce((a, b) => reducer(a, b));
  };
}

export function fold(fn) {
  return function (...args) {
    const lastArg = args[args.length - 1];
    if(lastArg.length) {
      return fn.call(this, ...args.slice(0, -1), ...lastArg);
    }
    return fn.call(this, ...args);
  };
}

export function reverse(fn) {
  return function (...args) {
    return fn.apply(this, args.reverse());
  };
}

export function spread(fn) {
  return function (first, ...rest) {
    return fn.call(this, first, rest);
  };
}

export function pipe(...fns) {
  return function (input) {
    return fns.reduce((a, b) => {
      return b.call(this, a);
    }, input);
  };
}
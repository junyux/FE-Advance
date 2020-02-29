function defer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

const _state = Symbol('state');
const _checkers = Symbol('checker');

export class Signal {
  constructor(initState) {
    this[_state] = initState;
    this[_checkers] = new Map();
  }

  get state() {
    return this[_state];
  }

  set state(value) {
    // 每次状态变化时，检查未结束的 defer 对象
    [...this[_checkers]].forEach(([promise, {type, deferred, state}]) => {
      if(type === 'while' && value !== state // 当信号状态改变时，while 信号结束
        || type === 'until' && value === state // 当信号状态改变为对应的 state 时，until 信号结束
      ) {
        deferred.resolve(value);
        this[_checkers].delete(promise);
      }
    });
    this[_state] = value;
  }

  while(state) {
    const deferred = defer();
    if(state !== this[_state]) {
      // 如果当前状态不是 while 状态， while 的 deferred 结束
      deferred.resolve(this[_state]);
    } else {
      // 否则将它添加到 checkers 列表中等待后续检查
      this[_checkers].set(deferred.promise, {type: 'while', deferred, state});
    }
    return deferred.promise;
  }

  until(state) {
    const deferred = defer();
    if(state === this[_state]) {
      // 如果当前状态就是 until 状态， until 的 deferred 结束
      deferred.resolve(this[_state]);
    } else {
      // 否则将它添加到 checkers 列表中等待后续检查
      this[_checkers].set(deferred.promise, {type: 'until', deferred, state});
    }
    return deferred.promise;
  }

  delete(promise) {
    this[_checkers].delete(promise);
  }

  deleteAll() {
    this[_checkers].clear();
  }
}
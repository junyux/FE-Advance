// 中间人
export default class PubSub {
  constructor() {
    this.subscribers = {};
  }

  /*
    @type 消息类型，如scroll
    @receiver 订阅者
    @fn 响应消息的处理函数
  */
  sub(type, receiver, fn) {
    this.subscribers[type] = this.subscribers[type] || [];
    this.subscribers[type].push(fn.bind(receiver));
  }

  /*
    @type 消息类型
    @sender 派发消息者
    @data 数据，比如状态数据
  */
  pub(type, sender, data) {
    const subscribers = this.subscribers[type];
    subscribers.forEach((subscriber) => {
      subscriber({type, sender, data});
    });
  }
}
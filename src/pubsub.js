export class PubSub {
  constructor() {
    this.subscribers = [];
  }

  subscribe(event, cb) {
    if (this.subscribers[event]) {
      this.subscribers[event].push(cb);
      return;
    }
    this.subscribers[event] = [cb];
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((func) => func(data));
      return;
    }
  }
}

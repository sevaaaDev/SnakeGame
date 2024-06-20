class PubSub {
  constructor() {
    this.listener = [];
  }

  listen(event, cb) {
    if (this.listener[event]) {
      this.listener[event].push(cb);
      return;
    }
    this.listener[event] = [cb];
  }

  publish(event, data) {
    if (this.listener[event]) {
      this.listener[event].forEach((func) => func(data));
      return;
    }
  }
}

const radio = new PubSub();
export default radio;

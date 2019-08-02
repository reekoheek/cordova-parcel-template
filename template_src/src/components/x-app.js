import { define, Component } from '@xinix/xin';

class XApp extends Component {
  get template () {
    return require('./x-app.html');
  }

  get props () {
    return {
      ...super.props,

      count: {
        type: Number,
        value: 0,
      },
    };
  }

  decrement () {
    this.set('count', this.count - 1);
  }

  increment () {
    this.set('count', this.count + 1);
  }
}

define('x-app', XApp);

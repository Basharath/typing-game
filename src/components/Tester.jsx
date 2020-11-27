import React, { Component, use } from 'react';

export default class Timer extends Component {
  count = this.props.counter;

  state = { counter: 10 };
  componentDidMount() {
    this.ticker();
  }

  componentDidUpdate() {
    if (counter === 0) this.resetTicker();
  }

  ticker() {
    this.interval = setInterval(() => {
      this.setState((state) => {
        return { counter: state.counter - 1 };
      });
    }, 1000);
  }

  resetTicker() {
    clearInterval(this.interval);
  }

  render() {
    const { score } = this.props;
    return (
      <div className="row mt-2">
        <div className="col text-center">
          Seconds left: {this.state.counter}
        </div>
        <div className="col text-center">Score: {this.props.score}</div>
      </div>
    );
  }
}

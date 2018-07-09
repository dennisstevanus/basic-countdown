import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';


class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: 0,
            time: '',
            isPlaying: false,
        }
        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    tick() {
        const timeLeft = this.state.timeLeft;
        if(timeLeft > 0) {
            this.setState({
                timeLeft: this.state.timeLeft - 1
            });
        } else {
            this.stopTimer();
        }
    }

    startTimer() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.setState({
            isPlaying: true
        });
    }

    stopTimer() {
        clearInterval(this.timerID);
            this.setState({
                isPlaying: false,
            });
    }

    resetTimer() {
        clearInterval(this.timerID);
        this.setState(() => ({ timeLeft: 0, isPlaying: false , time: 0}));
    }

    handleChange(event) {
        this.setState({time: event.target.value});
        this.setState({timeLeft: event.target.value});
    }

    render() {
        const isPlaying = this.state.isPlaying;
        return (
           <div>
               <input type="number" name="time" value={this.state.time} onChange={this.handleChange.bind(this)} />
               <h1>{this.state.timeLeft}</h1>
               <Start handleClick={isPlaying ? this.stopTimer : this.startTimer} handlePlaying={isPlaying} />
               <Reset handleClick={this.resetTimer} />
            </div>
        );
    }
}

const Start = (props) => {
    return (
        <button onClick={props.handleClick}>{props.handlePlaying ? "Pause" : "Start"}</button>
    );
}

const Reset = (props) => {
    return (
        <button onClick={props.handleClick}>Reset</button>
    );
} 


ReactDOM.render(
    <Timer />,
    document.getElementById('root')
);
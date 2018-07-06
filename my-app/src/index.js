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
        const currentDate = new Date();

        if(this.state.timeLeft === 0) {
            clearInterval(this.timerID);
            this.setState(() => ({ date: null, isPlaying: false }))
        }

        switch (!this.state.date) {
            case true:
                this.setState({
                    date: currentDate
                });
                break;
            default:
                this.setState((prevState, props) => ({
                    date: currentDate,
                    timeLeft: prevState.timeLeft - Math.round((currentDate - prevState.date) / 1000)
                }));
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
                date: null
            });
    }

    resetTimer() {
        clearInterval(this.timerID);
        this.setState(() => ({ timeLeft: 0, isPlaying: false , time: 0, date: null}));
    }

    handleChange(event) {
        this.setState({time: event.target.value});
        this.setState({timeLeft: event.target.value});
    }

    render() {
        const isPlaying = this.state.isPlaying;
        return (
           <div>
               <input type="number" name="time" value={this.state.time} onChange={this.handleChange.bind(this)}/>
               <h1>{this.state.timeLeft}</h1>
               <button onClick={isPlaying ? this.stopTimer : this.startTimer}>{isPlaying ? "Pause" : "Start"}</button>
               <button onClick={this.resetTimer}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Timer />,
    document.getElementById('root')
);
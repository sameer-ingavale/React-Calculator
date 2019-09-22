import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayValue: '0',
      previousValue: null,
      waitingForValue: false,
      currentOperand: null,
      operatorActive: false
    }

    this.input = this.input.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown',this.handleKeyDown);
}

  handleKeyDown = (event) => {

    if(event.key === '1' ||  event.key ==='2' || event.key ==='3' || event.key ==='4' || event.key ==='5' || event.key ==='6' || event.key ==='7' || event.key ==='8' || event.key ==='9' || event.key ==='0')
    {
    this.setState({
    displayValue: this.state.displayValue === '0' ? String(event.key) : this.state.displayValue + String(event.key)})
    } else if(event.key === 'Backspace') {
      this.setState({displayValue: '0'})
    } else if(event.key === '.') {
      this.inputDot();
    } else if(event.key === '=') {
      this.computeEqual()
    }

}

  clearValue = () => (
    this.setState({
      displayValue: '0',
      previousValue: null,
      currentOperand: null,
      waitingForValue: false,
      operatorActive: false
    })
  )

  input(digit) {

    const { displayValue, waitingForValue, operatorActive } = this.state;
    
    if(waitingForValue === true && operatorActive === false) {
        this.setState({
          previousValue: displayValue,
          displayValue: String(digit),
          waitingForValue: false,
          operatorActive: true
        })
    } else if(waitingForValue) {
      this.setState({
        displayValue: String(digit),
        waitingForValue:false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + String(digit)
      })
    } 
  }

  changeSign = () => {

    const {displayValue} = this.state;
    this.setState({displayValue: displayValue.charAt(0) !== '-' ? '-' + displayValue : displayValue.substr(1)})
  }

  percentify = () => {

    const {displayValue} = this.state;
    const displayFloat = parseFloat(displayValue);
    this.setState({ displayValue: String(displayFloat/100)})
  }

  inputDot = () => {

    const { displayValue, waitingForValue } = this.state;

    if(waitingForValue) {
      this.setState({
        displayValue: '.',
        waitingForValue: false
      })
    } else {
      this.setState({displayValue: displayValue.indexOf('.') === -1 ? displayValue + '.' : displayValue})
    }
  }

  computeOperator = (operand) => {

    if(this.state.waitingForValue === true && this.state.operatorActive === false) {
      return this.state
    } else if (this.state.operatorActive) {
      this.computeEqual();
      this.setState({
        waitingForValue: true,
        operatorActive: false,
        previousValue: this.state.displayValue
      })
    } else {
      this.setState({
        previousValue: this.state.displayValue,
        waitingForValue: true,
        operatorActive: true,
        currentOperand: operand
      })

    }
    
  }

  computeEqual = () => {
    const answer = String(eval(this.state.previousValue + this.state.currentOperand + this.state.displayValue))
    this.setState({
      displayValue: answer,
      operatorActive: false,
      waitingForValue: false
    })
  }

  render() {

    const { 
      displayValue
    } = this.state;

    return (
      <div id='wrapper'>
      <div className="calculator">
        <div className='calculator-display'>{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={this.clearValue}>{this.state.displayValue === '0' ? 'AC' : 'C'}</button>
              <button className="calculator-key key-sign" onClick={this.changeSign}>+/-</button>
              <button className="calculator-key key-percent" onClick={this.percentify}>%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={() => this.input('0')}>0</button>
              <button className="calculator-key key-dot" onClick={this.inputDot}>●</button>
              <button className="calculator-key key-1" onClick={() => this.input('1')}>1</button>
              <button className="calculator-key key-2" onClick={() => this.input('2')}>2</button>
              <button className="calculator-key key-3" onClick={() => this.input('3')}>3</button>
              <button className="calculator-key key-4" onClick={() => this.input('4')}>4</button>
              <button className="calculator-key key-5" onClick={() => this.input('5')}>5</button>
              <button className="calculator-key key-6" onClick={() => this.input('6')}>6</button>
              <button className="calculator-key key-7" onClick={() => this.input('7')}>7</button>
              <button className="calculator-key key-8" onClick={() => this.input('8')}>8</button>
              <button className="calculator-key key-9" onClick={() => this.input('9')}>9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button className="calculator-key key-divide" onClick={() => this.computeOperator('/')}>÷</button>
            <button className="calculator-key key-multiply" onClick={() => this.computeOperator('*')}>×</button>
            <button className="calculator-key key-subtract" onClick={() => this.computeOperator('-')}>−</button>
            <button className="calculator-key key-add" onClick={() => this.computeOperator('+')}>+</button>
            <button className="calculator-key key-equals" onClick={this.computeEqual}>=</button>
          </div>
        </div>
      </div>
    <div className='footer'>
    <p id='credits'>macOS calculator clone by Sameer Ingavale</p> 
    <img src={logo} className="React-logo" alt="react-logo" />
    </div>
      </div>
  );
  }
}

export default App;

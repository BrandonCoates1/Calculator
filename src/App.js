import './App.css';
import React from 'react';
import {create, all} from 'mathjs';
const math = create(all); 

class App extends React.Component {
  state = {
    output: 0,
    history: [],
    showHistory: false,
  }

  handleClick = (num) => {
    if(num === "AC") {
      this.setState({ output: 0, history: [] });
    } else if (num === "^" || num === "%" || num === "/" || num === "*") {
      return
    } else if (num === "=") {
      // learned about prevState and why you shouldn't do what is below ------------v
      this.setState({ output: math.evaluate(this.state.output), history: [...this.state.history, this.state.output] });
    } else if (this.state.output === 0) {
      this.setState({ output: num });
    } else {
      let str = this.state.output.toString().concat(num.toString());
      let array = str.split("");
      while (num === array[array.length - 2]) {
        return
      }
      this.setState({ output: this.state.output.toString().concat(num.toString()) });
    }
  }

  toggleHistory = () => {
    this.setState({ showHistory: !this.state.showHistory });
  }

  displayHistoryArray = () => {
    return this.state.history.map(item => <>{item}<br/></>);
  }

  render() {
    return (
    <div className="main">
      <div className="container">
        <Output className="output" text={this.state.output}/>
        <Button onClick={() => this.handleClick("AC")} className="top3" text="AC"/>
        <Button onClick={() => this.handleClick("^")} className="top3" text="xʸ"/>
        <Button onClick={() => this.handleClick("%")} className="top3" text="%"/>
        <Button onClick={() => this.handleClick("/")} className="operator" text="÷"/>
        <Button onClick={() => this.handleClick(7)} text="7"/>
        <Button onClick={() => this.handleClick(8)} text="8"/>
        <Button onClick={() => this.handleClick(9)} text="9"/>
        <Button onClick={() => this.handleClick("*")} className="operator" text="x"/>
        <Button onClick={() => this.handleClick(4)} text="4"/>
        <Button onClick={() => this.handleClick(5)} text="5"/>
        <Button onClick={() => this.handleClick(6)} text="6"/>
        <Button onClick={() => this.handleClick("-")} className="operator" text="-"/>
        <Button onClick={() => this.handleClick(1)} text="1"/>
        <Button onClick={() => this.handleClick(2)} text="2"/>
        <Button onClick={() => this.handleClick(3)} text="3"/>
        <Button onClick={() => this.handleClick("+")} className="operator" text="+"/>
        <Button onClick={() => this.handleClick(0)} className="zero" text="0"/>
        <Button onClick={() => this.handleClick(".")} text="."/>
        <Button onClick={() => this.handleClick("=")} className="operator" text="="/>
        <Button onClick={this.toggleHistory} className="historyButton" text="History"/>
      </div>
      {this.state.showHistory ? <div className="container2"><Output className="history" text={this.displayHistoryArray()}/></div>:null}
    </div>
    )
  }
}

const Button = (props) => {
  return (
  <button onClick={props.onClick} className={props.className}>{props.text}</button>
  )
}

const Output = (props) => {
  return (
    <p className={props.className}>{props.text}</p>
  );
}

export default App;
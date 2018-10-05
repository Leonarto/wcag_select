import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WcagSelect from './WcagSelect';
import ReactSelect from 'react-select';

const options = [
  {value: 1, label: 'Veggies'},
  {value: 2, label: 'Meat'},
  {value: 3, label: 'Pasta'},
  {value: 4, label: 'Fish'},
];

class App extends Component {
  state = {
    selectedFood: 1
  };

  handleOnChangeFood = (opt) => {
    this.setState({
      selectedFood: opt.value
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React WCAG Select</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-content-bg">
          <div className="App-content">
            <form>
              <label htmlFor="food">Food</label>
              <WcagSelect
                  id="food"
                  options={options}
                  value={this.state.selectedFood}
                  onChange={this.handleOnChangeFood}
              />
              <label htmlFor="food2">Food 2</label>
              <select className="select" id="food2">
                {options.map(opt => {
                  return <option value={opt.value} key={opt.value}>{opt.label}</option>
                })}
              </select>
              <label htmlFor="food3">Food 3</label>
              <ReactSelect options={options} inputOptions={{id: 'food3'}} id="food3"/>
              <button onClick={(e) => e.preventDefault()} tabIndex={0}>go</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

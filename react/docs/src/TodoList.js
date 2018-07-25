import React, { Component } from 'react';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      inputValue: ''
    }
  }
  handleBtnClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }
  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value
    })
  }
  render() {
    return (
      <div>
        <div>
          <input onChange={this.handleInputChange.bind(this)} value={this.state.inputValue}/>
          <button onClick={this.handleBtnClick.bind(this)}>add</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;

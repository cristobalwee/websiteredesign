import React, { Component } from 'react';
import $ from 'jquery';
import anime from 'animejs';
import Draggable from 'react-draggable';
import '../styles.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letterArray: [],
      modalOpen: false
    }
  }

  componentDidMount() {
    this.letters();
  }

  letters() {
    const string = this.props.title;
    let arr = [];
    for (let letter of string) {
      arr.push(letter);
    }
    this.setState({ letterArray: arr });
  }

  render() {
    return (
      <h1 className="letter-container">
        <a onClick={this.props.handler}>{this.state.letterArray.map((letter, i) => {
          if (this.props.spaces && this.props.spaces.indexOf(i) !== -1) {
            return <span key={i} className={"letter-" + this.props.name}>&nbsp;</span>
          }
          return <span key={i} className={"letter-" + this.props.name}>{letter}</span>
        })}
        </a>
      </h1>
    )
  }
}

export default Header;

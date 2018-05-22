import React, { Component } from 'react';
import $ from 'jquery';
import anime from 'animejs';
import './styles.css';

import logo from './media/logo.svg';
import line from './media/line.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollFlag: true,
      currPos: 0
    };
  }

  componentDidMount() {
    let flag = true;

    $("body").bind("mousewheel", (e) => {
      if (flag) {
        if(e.originalEvent.wheelDelta /120 < 0) {
          this.scroll(true);
        }
        if (e.originalEvent.wheelDelta /120 > 0) {
          this.scroll(false);
        }
        flag = false;
        setTimeout(() => {
          flag = true;
        }, 2000);
      }
    });
  }

  scroll(flag) {
    if (flag) {
      $("span").removeClass("glitch");
      anime({
        targets: '.fadeup',
        top: -50,
        duration: 1000
      });
    } else {
      $("span").addClass("glitch");
    }
  }

  render() {
    return (
      <div className="container">
        <div id="navbar">
          <img id="logo" src={logo}></img>
        </div>
        <div id="landing">
          <div id="landing-content" className="content">
            <span id="landing-head" className="glitch block fadeup" data-text="Hello there,">Hello there,</span>
            <span id="landing-subhead" className="glitch block fadeup" data-text="My name is Cristobal Graña, and I’m a">My name is Cristobal Graña, and I’m a</span>
            <span id="landing-subhead" className="glitch block fadeup" data-text="student at UIUC">student at UIUC</span>
          </div>
          <div className="scroll">
            <p>scroll</p>
            <img src={line}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

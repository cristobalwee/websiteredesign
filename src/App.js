import React, { Component } from 'react';
import $ from 'jquery';
import anime from 'animejs';
import './styles.css';

import logo from './media/logo.svg';
import line from './media/line.svg';
import Project from './components/project.js';

// https://kentatoshikura.com/
// https://theorosel.com/
// https://gijsroge.github.io/tilt.js/

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

  tweenUp(targets, delay) {
    targets.map((target, i) => {
      anime({
        targets: target,
        top: -20,
        opacity: 0,
        duration: 400,
        easing: 'easeInBack',
        offset: (i * 100),
        delay: delay
      });
    });
  }

  tweenDown(targets, delay) {
    targets = targets.reverse();
    targets.map((target, i) => {
      anime({
        targets: target,
        top: 20,
        opacity: 0,
        duration: 400,
        easing: 'easeInBack',
        offset: (i * 100),
        delay: delay
      });
    });
  }

  tweenIn(targets, delay) {
    targets.map((target, i) => {
      anime({
        targets: target,
        top: [20, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutBack',
        offset: (i * 100),
        delay: delay
      });
    });
  }

  scroll(flag) {
    let position = this.state.currPos;

    if (flag) {
      $("span").removeClass("glitch");
      let tl = anime.timeline({
        loop: false
      })
      this.tweenUp(['#landing-head', '#landing-subhead', '#landing-subhead-2'], 0);
      $('#telescope').css('opacity', 1);
      this.tweenIn(['#telescope-number', '#telescope-head', '#telescope-color'], 800);
    } else {
      if (this.state.currPos === 1) {
        $("span").addClass("glitch");
      }
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
            Hello there
          </div>
        </div>
        <div id="telescope" className="project">
          <div id="telescope-content" className="content">
            <p id="telescope-number" className="subhead">01/04</p>
            <p id="telescope-head" className="head">Telescope</p>
            <div id="telescope-color"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

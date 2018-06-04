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
// https://codepen.io/frontnerd/pen/JGwvYq

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
    // targets.map((target, i) => {
    //   anime({
    //     targets: target,
    //     top: -30,
    //     opacity: 0,
    //     duration: 400,
    //     easing: 'easeInOutQuint',
    //     delay: function(el, i) {
    //       return 100 + 25 * i;
    //     }
    //   });
    // });
    anime.timeline({loop: false})
      .add({
        targets: targets,
        top: -25,
        translateZ: 0,
        opacity: 0,
        easing: "easeOutExpo",
        duration: 1000,
        delay: function(el, i) {
          return 300 + 30 * i;
        }
      });
  }

  tweenDown(targets, delay) {
    targets = targets.reverse();
    anime.timeline({loop: false})
      .add({
        targets: targets,
        top: 25,
        translateZ: 0,
        opacity: 0,
        easing: "easeOutExpo",
        duration: 1000,
        delay: function(el, i) {
          return 300 + 30 * i;
        }
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
      let tl = anime.timeline({
        loop: false
      })
      this.tweenUp(['.letter'], 0);
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
        <div id="landing">
          <div id="landing-content" className="content">
            <span className="letter-container"><p>
              <span className="letter">H</span>
              <span className="letter">e</span>
              <span className="letter">l</span>
              <span className="letter">l</span>
              <span className="letter">o</span> &nbsp;
              <a><u><span className="letter">t</span>
              <span className="letter">h</span>
              <span className="letter">e</span>
              <span className="letter">r</span>
              <span className="letter">e</span></u></a>
            </p></span>
          </div>
        </div>
        <div id="navbar">
          <img id="logo" src={logo}></img>
        </div>
      </div>
    );
  }
}

export default App;

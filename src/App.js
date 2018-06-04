import React, { Component } from 'react';
import $ from 'jquery';
import anime from 'animejs';
import Draggable from 'react-draggable';
import './styles.css';

import logo from './media/logo.svg';
import line from './media/line.svg';
import Project from './components/project.js';
import underline from './media/underline.svg';

// https://kentatoshikura.com/
// https://theorosel.com/
// https://gijsroge.github.io/tilt.js/
// https://codepen.io/frontnerd/pen/JGwvYq

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollFlag: true,
      currPos: 0,
      modalOpen: false
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
        translateY: -10,
        opacity: 0,
        easing: "easeInCubic",
        duration: 400,
        offset: 100,
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
    if (this.state.modalOpen) {
      this.setState({ modalOpen: false });
    }

    if (flag) {
      let tl = anime.timeline({
        loop: false
      });
      $('#underline').css('opacity', 0);
      this.tweenUp(['.letter'], 0);
      $('#telescope').css('opacity', 1);
      this.tweenIn(['#telescope-number', '#telescope-head', '#telescope-color'], 800);
    } else {
      if (this.state.currPos === 1) {

      }
    }
  }

  render() {
    return (
      <div className="container">
        <div id="landing">
          <Draggable
            className="content"
            defaultPosition={{x: 50, y: 50}}>
            <div className="modal" style={this.state.modalOpen ? {display: 'block'} : {display: 'none'}}>
              <a className="close" onClick={() => {
                let flag = this.state.modalOpen;
                this.setState({ modalOpen: !flag });
              }}><p>x</p></a>
              <h2>Wtf?</h2>
              <p>hey my name is cristobal grana and I like to do stuff with the web scroll down if you want to see what kind of stuff ok thank you bye.</p>
            </div>
          </Draggable>
          <div id="landing-content" className="content">
            <h2 className="letter-container">
              <span className="letter">H</span>
              <span className="letter">e</span>
              <span className="letter">l</span>
              <span className="letter">l</span>
              <span className="letter">o</span> &nbsp;
              <a onClick={() => {
                let flag = this.state.modalOpen;
                $('.modal').css('opacity', '1');
                this.setState({ modalOpen: !flag });
                }}>
                <span className="letter">t</span>
                <span className="letter">h</span>
                <span className="letter">e</span>
                <span className="letter">r</span>
                <span className="letter">e</span><br></br>
                <img id="underline" src={underline}></img>
              </a>
            </h2>
          </div>
          <div id="works" className="content">

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

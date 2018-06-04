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
      loading: true,
      loaded: 0,
      scrollFlag: true,
      currPos: 0,
      modalOpen: false,
      positions: [
        "#landing",
        "#punchbuddy",
        "#telescope",
        "#godaddy",
        "#gastronomads",
        "#this"
      ],
      targets: [
        ["#landing-head", "#landing-sub-head", "#landing-2-sub-head"],
        ["#about-head", "#about-info", "#about-contact"],
        ["#telescope-info", "#telescope-photo"],
        ["#godaddy-info", "#godaddy-photo"],
        ["#gastronomads-info", "#gastronomads-photo"],
        ["#foodful-info", "#foodful-photo"],
        ["#contact-head", "#contact-sub-head", "#contact-links"]
      ]
    };
  }

  componentDidMount() {
    this.tweenIn(['.letter-hello'], 0);
    anime({
      targets: '#underline',
      opacity: 1,
      duration: 250,
      easing: 'easeOutCubic',
      offset: 500
    });
    anime({
      targets: '#navbar',
      opacity: 1,
      duration: 600,
      translateY: [15, 0],
      easing: 'easeOutCubic',
      offset: 1000
    });

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
    anime.timeline({loop: false})
      .add({
        targets: targets,
        translateY: [10, 0],
        opacity: [0, 1],
        easing: "easeOutCubic",
        duration: 400,
        offset: 100,
        delay: function(el, i) {
          return 300 + 30 * i;
        }
      });
  }

  tweenColor(targets, color) {
    anime({
      targets: targets,
      backgroundColor: color,
      duration: 800,
      easing: 'easeOutCubic',
      offset: 1000
    });
  }

  resetTween(object) {
    $(object).css("top", "0");
    $(object).css("opacity", "1");
  }

  hide(object, time) {
    $(object).css("display", "none");
  }

  show(object, time) {
    $(object).css("display", "block");
  }

  renderNext(curr, next, targetsOut, targetsIn) {
    console.log(curr + " " + next + " " + targetsIn + " " + targetsOut);
    this.setState({ currPos: next });
  }

  scroll(down) {
    let position = this.state.currPos;
    // if (this.state.modalOpen) {
    //   this.setState({ modalOpen: false });
    // }

    if (down) {
      if (this.state.currPos === 6) {
        return;
      }

      this.renderNext(this.state.currPos, this.state.currPos + 1, this.state.targets[this.state.currPos], this.state.targets[this.state.currPos + 1]);

      $('#underline').css('opacity', 0);
      this.tweenUp(['.letter-hello'], 0);
      this.tweenColor('#color', '#3fb54f');
    } else {
      if (this.state.currPos === 0) {
        return;
      }

      this.renderNext(this.state.currPos, this.state.currPos - 1, this.state.targets[this.state.currPos], this.state.targets[this.state.currPos - 1]);
    }
  }

  render() {
    return (
      <div className="container">
        <div id="landing">
          <Draggable defaultPosition={{x: 50, y: 50}}>
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
              <span className="letter-hello">H</span>
              <span className="letter-hello">e</span>
              <span className="letter-hello">l</span>
              <span className="letter-hello">l</span>
              <span className="letter-hello">o</span> &nbsp;
              <a onClick={() => {
                let flag = this.state.modalOpen;
                $('.modal').css('opacity', '1');
                this.setState({ modalOpen: !flag });
                }}>
                <span className="letter-hello">t</span>
                <span className="letter-hello">h</span>
                <span className="letter-hello">e</span>
                <span className="letter-hello">r</span>
                <span className="letter-hello">e</span><br></br>
                <img id="underline" src={underline}></img>
              </a>
            </h2>
          </div>
        </div>
        <div id="works">
          <div id="works-container" className="content">
            <div id="color"></div>
            <h1 className="letter-container">
              <span className="letter-telescope">T</span>
              <span className="letter-telescope">e</span>
              <span className="letter-telescope">l</span>
              <span className="letter-telescope">e</span>
              <span className="letter-telescope">s</span>
              <span className="letter-telescope">c</span>
              <span className="letter-telescope">o</span>
              <span className="letter-telescope">p</span>
              <span className="letter-telescope">e</span>
            </h1>
          </div>
        </div>
        <div id="telescope">
          <div id="works-content" className="content">
            <h1 className="letter-container">
              <span className="letter-telescope">T</span>
              <span className="letter-telescope">e</span>
              <span className="letter-telescope">l</span>
              <span className="letter-telescope">e</span>
              <span className="letter-telescope">s</span>
              <span className="letter-telescope">c</span>
              <span className="letter-telescope">o</span>
              <span className="letter-telescope">p</span>
              <span className="letter-telescope">e</span>
            </h1>
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

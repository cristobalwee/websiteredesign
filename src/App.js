import React, { Component } from 'react';
import $ from 'jquery';
import anime from 'animejs';
import Draggable from 'react-draggable';
import Swipeable from 'react-swipeable';
import './styles.css';

import logo from './media/logo.svg';
import line from './media/line.svg';
import Project from './components/project.js';
import Header from './components/header.js';
import underline from './media/underline.svg';

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
      projectOpen: false,
      projects: [
        "Hello",
        "Telescope",
        "Punch Buddy",
        "GoDaddy",
        "Gastronomads",
        "This is a Website"
      ],
      info: [
        "There",
        "a vue.js ui framework I've been developing except making frameworks is really hard so I stopped for a bit.",
        "I never knew what to do when I boxed by myself so I made an app that could help I think it's cool.",
        "last summer I worked on ui engineering for godaddy's hosting platform and made some react webs and such.",
        "my brother asked me to make a website for his food writing so I did with a little help from the meteors.",
        "I like to look at brutalist websites so I wanted to make one except it's not done yet."
      ],
      github: [
        "",
        "https://github.com/cristobalwee/telescope",
        "https://github.com/cristobalwee/punchbuddy",
        "",
        "https://github.com/cristobalwee/gastronomads",
        ""
      ],
      links: [
        "",
        "http://vue-telescope.com/",
        "https://cristobalwee.github.io/punchbuddyweb/",
        "https://www.godaddy.com/",
        "http://gastronomads.co/",
        "http://awebsite.wtf"
      ],
      colors: [
        "#000000",
        "#404e5c",
        "#13c5cf",
        "#3fb54f",
        "#838383",
        "#0100ff"
      ],
      targets: [
        ".letter-hello",
        ".letter-telescope",
        ".letter-punch",
        ".letter-godaddy",
        ".letter-gastronomads",
        ".letter-this",
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

  swipedDown() {
    console.log("Up");
  }

  swipedUp() {
    console.log("Down");
    if (this.state.currPos === 5) {
      return;
    }

    this.renderNext(this.state.currPos, this.state.currPos + 1, this.state.targets[this.state.currPos], this.state.targets[this.state.currPos + 1]);
  }

  tweenUp(targets, delay) {
    anime.timeline({loop: false})
      .add({
        targets: targets,
        translateY: -15,
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
    anime.timeline({loop: false})
      .add({
        targets: targets,
        translateY: 10,
        opacity: [1, 0],
        easing: "easeInCubic",
        duration: 400,
        offset: 100,
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

  tweenOut(targets, delay) {
    anime.timeline({loop: false})
      .add({
        targets: targets,
        translateY: [-10, 0],
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
      offset: 500
    });
  }

  resetTween(object) {
    $(object).css("top", "0");
    $(object).css("opacity", "1");
  }

  hide(object) {
    setTimeout(() => {
      $(object).css('display', 'none');
    }, 1000);
  }

  show(object) {
    $(object).css("display", "inline-block");
  }

  renderNext(curr, next, targetsOut, targetsIn) {
    if (next === curr) {
      return;
    }

    if (next > curr) {
      if (curr === 0) {
        $('#underline').css('opacity', 0);
        $('#works').css('z-index', '10');
        this.tweenUp(targetsOut, 0);
        this.hide(targetsOut);
        this.show(targetsIn);
        this.show('#works');
        setTimeout(() => {
          this.tweenColor('#color', this.state.colors[next]);
          this.tweenIn(targetsIn, 0);
          $('#indicator').css('opacity', 1);
          $('#underline').css('display', 'none');
        }, 1500);
        this.setState({ currPos: next });
      } else {
        this.setState({ projectOpen: false });
        this.tweenUp(targetsOut, 0);
        this.hide(targetsOut);
        this.show(targetsIn);
        setTimeout(() => {
          this.tweenColor('#color', this.state.colors[next]);
          this.tweenIn(targetsIn, 0);
        }, 800);
        this.setState({ currPos: next });
      }
    } else {
      if (next === 0) {
        $('#indicator').css('opacity', 0);
        $('#works').css('z-index', -1);
        this.tweenDown(targetsOut, 0);
        this.hide(targetsOut);
        this.tweenColor('#color', this.state.colors[next]);
        this.hide('#works');
        this.show('#underline');
        setTimeout(() => {
          this.show(targetsIn);
          this.tweenOut(targetsIn, 0);
        }, 1000);
        setTimeout(() => {
          $('#underline').css('opacity', 1);
        }, 1400);
        this.setState({ currPos: next });
      } else {
        this.tweenDown(targetsOut, 0);
        this.hide(targetsOut);
        setTimeout(() => {
          this.show(targetsIn);
          this.tweenColor('#color', this.state.colors[next]);
          this.tweenOut(targetsIn, 0);
        }, 1000);
        this.setState({ currPos: next });
      }
    }
  }

  scroll(down) {
    let position = this.state.currPos;
    if (this.state.modalOpen) {
      anime({
        targets: '.modal',
        opacity: 0,
        duration: 100,
        easing: 'linear'
      });
      setTimeout(() => {
        this.setState({ modalOpen: false });
      }, 300);
    }

    if (this.state.projectOpen) {
      anime({
        targets: '#project-modal',
        opacity: 0,
        duration: 100,
        easing: 'linear'
      });
      setTimeout(() => {
        this.setState({ projectOpen: false });
      }, 300);
    }

    if (down) {
      if (this.state.currPos === 5) {
        return;
      }

      this.renderNext(this.state.currPos, this.state.currPos + 1, this.state.targets[this.state.currPos], this.state.targets[this.state.currPos + 1]);
    } else {
      if (this.state.currPos === 0) {
        return;
      }

      this.renderNext(this.state.currPos, this.state.currPos - 1, this.state.targets[this.state.currPos], this.state.targets[this.state.currPos - 1]);
    }
  }

  render() {
    return (
      <Swipeable
       onSwipedDown={() => {
         if (this.state.modalOpen) {
           anime({
             targets: '.modal',
             opacity: 0,
             duration: 100,
             easing: 'linear'
           });
           setTimeout(() => {
             this.setState({ modalOpen: false });
           }, 300);
         }

         if (this.state.projectOpen) {
           anime({
             targets: '#project-modal',
             opacity: 0,
             duration: 100,
             easing: 'linear'
           });
           setTimeout(() => {
             this.setState({ projectOpen: false });
           }, 300);
         }

         if (this.state.currPos === 0) {
           return;
         }

         this.renderNext(this.state.currPos, this.state.currPos - 1, this.state.targets[this.state.currPos], this.state.targets[this.state.currPos - 1]);
       }}
       onSwipedUp={() => {
         if (this.state.modalOpen) {
           anime({
             targets: '.modal',
             opacity: 0,
             duration: 100,
             easing: 'linear'
           });
           setTimeout(() => {
             this.setState({ modalOpen: false });
           }, 300);
         }

         if (this.state.projectOpen) {
           anime({
             targets: '#project-modal',
             opacity: 0,
             duration: 100,
             easing: 'linear'
           });
           setTimeout(() => {
             this.setState({ projectOpen: false });
           }, 300);
         }

         if (this.state.currPos === 5) {
           return;
         }

         this.renderNext(this.state.currPos, this.state.currPos + 1, this.state.targets[this.state.currPos], this.state.targets[this.state.currPos + 1]);
       }} >
        <div className="container">
          <div id="landing">
            <Draggable defaultPosition={{x: 50, y: 50}}>
              <div className="modal" style={this.state.modalOpen ? {display: 'block'} : {display: 'none'}}>
                <a className="close" onClick={() => {
                  anime({
                    targets: '.modal',
                    opacity: 0,
                    duration: 100,
                    easing: 'linear'
                  });
                  setTimeout(() => {
                    this.setState({ modalOpen: false });
                  }, 300);
                }}><p>x</p></a>
                <h2>Here?</h2>
                <p style={{marginBottom: '1rem'}}>yea hi my name is cristobal grana and I like to do stuff with the web scroll down if you want to see what kind of stuff ok thank you bye.</p>
                <p>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/cristobalwee" className="link">github</a>&nbsp;
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/cristobal-grana-samanez" className="link">linkedin</a>&nbsp;
                  <a target="_blank" rel="noreferrer" href="https://twitter.com/cristo_grana" className="link">twitter</a>&nbsp;
                  <a href="mailto:hellothere@cristobalgrana.me" className="link">email</a>
                </p>
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
                    this.setState({ modalOpen: true });
                    anime({
                      targets: '.modal',
                      opacity: 1,
                      duration: 100,
                      easing: 'linear'
                    });
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
          <div id="color-container">
            <div id="color"><h3 id="indicator">0{this.state.currPos > 0 ? this.state.currPos : 1}/05</h3></div>
          </div>
          <div id="works">
            <div id="works-container" className="content">
              <div id="project-modal" className="modal" style={this.state.projectOpen ? {display: 'block'} : {display: 'none'}}>
                <a className="close" onClick={() => {
                  anime({
                    targets: '#project-modal',
                    opacity: 0,
                    duration: 100,
                    easing: 'linear'
                  });
                  setTimeout(() => {
                    this.setState({ projectOpen: false });
                  }, 400);
                }}><p>x</p></a>
                <h2>{this.state.projects[this.state.currPos]}</h2>
                <p style={{marginBottom: '1rem'}}>{this.state.info[this.state.currPos]}</p>
                <p>
                  {(this.state.github[this.state.currPos]) && <a style={{marginRight: '10px'}} target="_blank" rel="noopener noreferrer" href={this.state.github[this.state.currPos]} className="link">github</a>}
                  {(this.state.links[this.state.currPos]) && <a target="_blank" rel="noopener noreferrer" href={this.state.links[this.state.currPos]} className="link">website</a>}
                </p>
              </div>
              <Header title={"Telescope"} name={"telescope"} handler={() => {
                this.setState({ projectOpen: true });
                anime({
                  targets: '#project-modal',
                  opacity: 1,
                  duration: 100,
                  easing: 'linear'
                });
              }} />
              <Header title={"Punch Buddy"} name={"punch"} handler={() => {
                this.setState({ projectOpen: true });
                anime({
                  targets: '#project-modal',
                  opacity: 1,
                  duration: 100,
                  easing: 'linear'
                });
              }} spaces={[5]} />
              <Header title={"GoDaddy"} name={"godaddy"} handler={() => {
                this.setState({ projectOpen: true });
                anime({
                  targets: '#project-modal',
                  opacity: 1,
                  duration: 100,
                  easing: 'linear'
                });
              }} />
              <Header title={"Gastronomads"} name={"gastronomads"} handler={() => {
                this.setState({ projectOpen: true });
                anime({
                  targets: '#project-modal',
                  opacity: 1,
                  duration: 100,
                  easing: 'linear'
                });
              }} />
              <Header title={"A Website"} name={"this"} handler={() => {
                this.setState({ projectOpen: true });
                anime({
                  targets: '#project-modal',
                  opacity: 1,
                  duration: 100,
                  easing: 'linear'
                });
              }} spaces={[1]} />
            </div>
          </div>
          <div id="navbar">
            <a onClick={() => this.renderNext(this.state.currPos, 0, this.state.targets[this.state.currPos], this.state.targets[0])}><img id="logo" src={logo}></img></a>
          </div>
        </div>
      </Swipeable>
    );
  }
}

export default App;

import React, { Component } from 'react';
import $ from 'jquery';
import '../styles.css';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loaded: 0
    };
  }

  componentDidMount() {
    let loadInt = setInterval(() => {
      let next = this.state.loaded + 1;
      if (next < 101) {
        this.setState({ loaded: next });
      } else {
        setTimeout(() => {
          $('#loader').css('opacity', '0');
        }, 500);
      }
    }, 40);

    if (this.state.loaded === 100) {
      clearInterval(loadInt);
    }
  }

  render() {
    return (
      <div id="loader">
        <p className="content">{this.state.loaded}%</p>
      </div>
    );
  }
}

export default Loader;

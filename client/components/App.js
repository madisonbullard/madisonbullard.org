import React, { Component } from 'react';
import styled from 'react-emotion';
import { injectGlobal, fontFace } from 'emotion';
import { ThemeProvider, withTheme } from 'theming';

import BackgroundSpin from './background_spin';
import AboutPanel from './about_panel';
import VideoPlayer from './video_player';

// let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// console.log(w);
const theme = {
  color: "#F7F878"
};

const BodyDiv = withTheme(styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
`)

const ContainerDiv = styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  grid-area: 1 / 1 / -1 / -1;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, counter: 0 };
  } 

  _onMouseMove(e) {
    e.persist();
    this.setState((prevState, props) => {
      const { x, y } = this.state;
      const increment = Math.abs(e.screenX-prevState.x) + Math.abs(e.screenY-prevState.y);
      const rate = 0.4;
      return ({
        counter: (prevState.counter+increment*rate)%360,
        x: e.screenX, 
        y: e.screenY 
      })
    })
  }

  render(){
    return(
      <ThemeProvider theme={theme}>
        <BodyDiv onMouseMove={this._onMouseMove.bind(this)}>
          <ContainerDiv>
            <AboutPanel counter={this.state.counter}/>
            <VideoPlayer url="reel" />
          </ContainerDiv>
          <BackgroundSpin counter={this.state.counter}/>
        </BodyDiv>
      </ThemeProvider>
    )
  }
}

export default App

injectGlobal`
  html, body, #root {
    font-family: -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Roboto Light",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    line-height: 1.5;
  }
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
`
fontFace`
  font-family: 'Krungthep';
  src: local('Krungthep');
`
fontFace`
  font-family: 'Gandur';
  font-weight: regular;
  src: local('Gandur');
`
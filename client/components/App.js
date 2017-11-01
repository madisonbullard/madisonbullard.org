import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { injectGlobal, fontFace } from 'emotion';
import { ThemeProvider, withTheme } from 'emotion-theming';
import detectIt from 'detect-it';

// import Krungthep from '../fonts/krungthep.woff2';
// import Gandur from '../fonts/gandur-regular.woff2';
import BackgroundSpin from './background_spin';
import AboutPanel from './about_panel';
import EmailBar from './email_bar';
import textShadow from './text_shadow';

const theme = {
  color: "#B0F366", //green
  colorText: "#EEE",
  colorHeader: "#CCC",
  colorSelectedActive: "#FFCEE3",
  colorSelectedText: "#EEE",
  headerTextShadowForeground: "#555",
  headerTextShadowBackground: "#999",
  buttonTextShadowForeground: "#350792",
  buttonTextShadowBackground: "#A8AEC7",
  emailBarHeight: 75,
  transitionDuration: 600,
  alertHold: 2000,
  animationRate: "cubic-bezier(.32,.01,.1,1)"
};
const BodyDiv = styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
`

const ContainerDiv = styled('div')`
  grid-area: 1 / 1 / -1 / -1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  font-family: Krungthep;
  & h1 {
    text-align: center;
    width: 100%;
    margin: auto 0;
    font-family: Gandur;
    font-weight: normal;
    color: ${props => theme.colorHeader};
    font-size: 96px;
    ${props => textShadow(props.theme.headerTextShadowForeground, props.theme.headerTextShadowBackground)};
    @media (max-width: 475px) {
      font-size: 14vw;
    }
    @media (orientation: landscape) {
      padding-top: 4vh;
    }
  }
`

const CopiedMsgDiv = styled('div')`
  & p {
    font-size: 1.3rem;
    @media (max-width: 475px){
      font-size: 4.3vw;
    }
    @media (orientation: landscape) {
      font-size: 1.2rem;
    }
    & span{
      position: relative;
    }
    & span:nth-child(1){
      z-index: 1;
    }    
    & span:nth-child(2){
      z-index: 2;
    }
    & span:nth-child(3){
      z-index: 3;
    }
    & span:nth-child(5){
      z-index: 4;
    }
  }
`

const HueFilterSpan = styled('span')`
  filter: hue-rotate(${props => props.rotAngle}deg) saturate(80%);
  color: ${props => props.theme.colorSelectedActive};
  position: relative;
`

const UnderlineSpan = styled('span')`
  text-decoration: underline;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      x: 0, y: 0, 
      copyText: 'madison.bullard@gmail.com',
      counter: 0,
      counterEmail: 0
    };
  }

  checkMobile() {
    if (detectIt.hasMouse){
      this.setState({isMobile: false})
    }else{
      this.setState({isMobile: true})
    }
  }

  componentDidMount() {
    this.checkMobile();
    setInterval(this.timer.bind(this, 'counterEmail', 16), 1000/60);
  }

  timer(key, rate) {
    const obj = {};
    obj[key] = (this.state[key]+rate)%360;
    this.setState(obj);
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (nextState.isMobile!==this.state.isMobile) {
      if (nextState.isMobile) {
        const intervalId = setInterval(this.timer.bind(this, 'counter', 4), 1000/60);
        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId})
      } else {
        clearInterval(this.state.intervalId);
      }
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
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
    const { isMobile, copyText, counter, counterEmail } = this.state;
    return(
      <ThemeProvider theme={theme}>
        <BodyDiv onMouseMove={!isMobile ? this._onMouseMove.bind(this) : null} theme={theme}>
          <ContainerDiv>
            <h1>Madison Bullard</h1>
            <AboutPanel counter={counter}/>
            <EmailBar copyText={copyText} theme={theme}>
              <CopiedMsgDiv>
                <p><span>My email (</span><HueFilterSpan rotAngle={counterEmail}>{copyText}</HueFilterSpan><span>)</span><br /><span>has been copied to your clipboard!</span></p>
              </CopiedMsgDiv>
              <div>
                <p>Get in touch!</p>
              </div>
            </EmailBar>
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
    font-size: 16px;
    & textarea, input, button { 
      outline: none; 
    }
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
// fontFace`
//   font-family: 'Patrick Hand SC';
//   font-style: normal;
//   font-weight: 400;
//   src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'), url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2) format('woff2');
//   unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
// `
fontFace`
  font-family: 'Krungthep';
  src: local('Krungthep'), url(https://dl.dropboxusercontent.com/s/5ktyvonixdtyfb3/krungthep.woff2?dl=0) format('woff2');
`
fontFace`
  font-family: 'Gandur';
  font-weight: regular;
  src: local('Gandur'), url(https://dl.dropboxusercontent.com/s/akqp8u5rx2j3tey/gandur-regular.woff2?dl=0) format('woff2');
`
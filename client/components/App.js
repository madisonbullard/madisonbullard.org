import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { injectGlobal, fontFace } from 'emotion';
import { ThemeProvider, withTheme } from 'emotion-theming';
import detectIt from 'detect-it';

import BackgroundSpin from './background_spin';
import AboutPanel from './about_panel';
import EmailBar from './email_bar';
import textShadow from './text_shadow';

const theme = {
  color: "#7ACED6", //green
  colorHover: "#64B2C8",
  colorText: "#EEE",
  colorHeader: "#CCC",
  colorSelectedActive: "#131B43",
  colorSelectedText: "#EEE",
  colorSelectedTextHueRotate: "#64B2C8",
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
  color: ${props => props.theme.colorSelectedTextHueRotate};
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
    let intervalId = null;
    if (detectIt.hasMouse){
      this.setState({isMobile: false})
      intervalId = setInterval(this.timer.bind(this, 'counterEmail', 16), 1000/60);
    }else{
      this.setState({isMobile: true})
      intervalId = setInterval(this.timer.bind(this, 'counter', 8), 1000/30);
    }
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId})
  }

  componentDidMount() {
    this.checkMobile();
  }

  timer(key, rate) {
    const obj = {};
    obj[key] = (this.state[key]+rate)%360;
    this.setState(obj);
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
        <BodyDiv onMouseMove={isMobile ? null : this._onMouseMove.bind(this)} theme={theme}>
            <ContainerDiv>
              <h1>Madison Bullard</h1>
              <AboutPanel counter={counter}/>
              <EmailBar copyText={copyText} theme={theme}>
                <CopiedMsgDiv>
                  <p><span>My email (</span><HueFilterSpan rotAngle={isMobile ? counter*4 : counterEmail}>{copyText}</HueFilterSpan><span>)</span><br /><span>has been copied to your clipboard!</span></p>
                </CopiedMsgDiv>
                <div>
                  <p>Get in touch!</p>
                </div>
              </EmailBar>
            </ContainerDiv>
            <BackgroundSpin counter={counter} isMobile={isMobile}/>
        </BodyDiv>
      </ThemeProvider>
    )
  }
}

export default App

injectGlobal`
  html, body, #root {
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
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`
fontFace`
  font-family: 'Krungthep';
  src: local('Krungthep'), url(https://dl.dropboxusercontent.com/s/5ktyvonixdtyfb3/krungthep.woff2?dl=0) format('woff2');
`
fontFace`
  font-family: 'Gandur';
  font-weight: regular;
  src: local('Gandur'), url(https://dl.dropboxusercontent.com/s/akqp8u5rx2j3tey/gandur-regular.woff2?dl=0) format('woff2');
`
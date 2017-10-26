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
import { textShadow } from './text_shadow';

const theme = {
  color: "#F7F878", //yellow
  colorText: "#EEE",
  colorHeader: "#CCC",
  colorSelectedActive: "#222",
  colorSelectedText: "#22FE52",
  headerTextShadowForeground: "#555",
  headerTextShadowBackground: "#999",
  buttonTextShadowForeground: "#555",
  buttonTextShadowBackground: "#999",
  emailBarHeight: 75,
  transitionDuration: 600,
  alertHold: 2000
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
  }
`

const HueFilterSpan = styled('span')`
  filter: hue-rotate(${props => props.rotAngle}deg);
  color: red;
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
                <p>My email (<HueFilterSpan rotAngle={counterEmail}>{copyText}</HueFilterSpan>)<br />has been copied to your clipboard!</p>
              </CopiedMsgDiv>
              <div>
                <p><HueFilterSpan rotAngle={counter+120}>👉</HueFilterSpan> I will respond to your email <HueFilterSpan rotAngle={counter+240}>👈</HueFilterSpan></p>
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
fontFace`
  font-family: 'Krungthep';
  src: local('Krungthep') url(https://dl.dropboxusercontent.com/s/5ktyvonixdtyfb3/krungthep.woff2?dl=0) format('woff2');
`
fontFace`
  font-family: 'Gandur';
  font-weight: regular;
  src: local('Gandur') url(https://dl.dropboxusercontent.com/s/akqp8u5rx2j3tey/gandur-regular.woff2?dl=0) format('woff2');
`
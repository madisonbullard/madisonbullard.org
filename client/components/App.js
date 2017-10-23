import React, { Component } from 'react';
import styled from 'react-emotion';
import { injectGlobal, fontFace } from 'emotion';
import { ThemeProvider, withTheme } from 'emotion-theming';
import detectIt from 'detect-it';

import BackgroundSpin from './background_spin';
import AboutPanel from './about_panel';
import VideoPlayer from './video_player';
import EmailBar from './email_bar';

const theme = {
  color: "#F7F878",
  colorSelected: "#D7F2BA",
  emailBarHeight: 75,
  transitionDuration: 600,
  alertHold: 2000
};

const BodyDiv = withTheme(styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
`)

const ContainerDiv = styled('div')`
  grid-area: 1 / 1 / -1 / -1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  font-family: Krungthep;
  & h1 {
    text-align: center;
    width: 100%;
    font-family: Gandur;
    font-weight: normal;
    margin: 0;
    color: ${props => theme.color};
    background-color: #777;
    font-size: 96px;
    @media (max-width: 475px) {
      font-size: 12.6vw;
    }
    @media (orientation: landscape) {
      font-size: 4rem;
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
    setInterval(this.timerEmail.bind(this, 'counterEmail', 16), 1000/60);
  }

  timer(key, rate) {
    const obj = {};
    obj[key] = (this.state[key]+rate)%360;
    console.log(obj);
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
        <BodyDiv onMouseMove={!isMobile ? this._onMouseMove.bind(this) : null}>
          <ContainerDiv>
            <h1>Madison Bullard</h1>
            <AboutPanel counter={counter}/>
            <VideoPlayer url="reel" />
            <EmailBar copyText={copyText} theme={theme}>
              <CopiedMsgDiv>
                <p>My email (<HueFilterSpan rotAngle={counterEmail}>{copyText}</HueFilterSpan>)<br />has been copied to your clipboard!</p>
              </CopiedMsgDiv>
              <div>
                <p><HueFilterSpan rotAngle={counter+120}>👉</HueFilterSpan> I <UnderlineSpan>will</UnderlineSpan> respond to your email <HueFilterSpan rotAngle={counter+240}>👈</HueFilterSpan></p>
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
  src: local('Krungthep');
`
fontFace`
  font-family: 'Gandur';
  font-weight: regular;
  src: local('Gandur');
`
import React, { Component } from 'react';
import styled from 'react-emotion';
import { injectGlobal, fontFace } from 'emotion';
import { ThemeProvider, withTheme } from 'theming';

import BackgroundSpin from './background_spin';
import Slider from './slider';
import AboutPanel from './about_panel';
import VideoPlayer from './video_player';
import EmailBar from './email_bar';

const theme = {
  color: "#F7F878",
  emailBarHeight: 90
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
    font-size: 96px;
    font-family: Gandur;
    font-weight: normal;
    margin: 0;
    color: ${props => theme.color};
    background-color: #777;
    @media (max-width: 475px) {
      font-size: 15vw;
    }
  }
`
  const myTimer = () => {
    
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, counter: 0, width: window.innerWidth };
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidMount() {
    this.checkMobile();   
    const intervalId = setInterval(this.timer, 1000/60);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId})
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    clearInterval(this.state.intervalId);
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth })
    this.checkMobile();
  }

  checkMobile() {
    const { width } = this.state;
    if (width <= 500){
      this.setState({isMobile: true})
      // store intervalId in the state so it can be accessed later:
    }else{
      this.setState({isMobile: false})
      clearInterval(this.state.intervalId)
      console.log('clearInterval')
    }
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

  timer() {
    this.setState({ counter: (this.state.counter+4)%360 });
  }

  render(){
    const { width } = this.state;
    const isMobile = width <= 500;
    // console.log('mobile', isMobile)

    // const t1 = this.timer(1000/60, function(){
    //   this.setState(prevState => {
    //     return ({      
    //       counter: (prevState.counter+0.5)%360
    //     })
    //   })
    // }.bind(this))

    // isMobile ? t1.start() : t1.clear()

    let counter = () => {
      return this.state.counter 
    }
    // console.log(counter())

    return(
      <ThemeProvider theme={theme}>
        <BodyDiv onMouseMove={!isMobile ? this._onMouseMove.bind(this) : null}>
          <ContainerDiv>
            <h1>Madison Bullard</h1>
            <Slider>
              <AboutPanel counter={counter()}/>
              <VideoPlayer url="reel" />
            </Slider>
            <EmailBar counter={counter()}/>
          </ContainerDiv>
          <BackgroundSpin counter={counter()}/>
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
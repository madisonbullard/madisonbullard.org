import React from 'react';
import styled from 'react-emotion';
import { injectGlobal, fontFace } from 'emotion';

import BackgroundSpin from './background_spin';
import AboutPanel from './about_panel';
import VideoPlayer from './video_player';

const ContainerDiv = styled('div')`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-areas: "header"
                       "about"
                       "reel";
  grid-template-rows: 360px;
  grid-template-columns: auto;
`

const HeaderH1 = styled('h1')`
  font-size: 4rem;
`

const App = () => {
  return(
    <ContainerDiv>
      <HeaderH1>Madison Bullard</HeaderH1>
      <AboutPanel />
      <VideoPlayer url="reel" />
      <BackgroundSpin />
    </ContainerDiv>
  )
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
    color: #495057;
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
  font-family: 'Oxygen';
  font-style: normal;
  font-weight: 400;
  src: local('Oxygen Regular'), local('Oxygen-Regular'), url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`
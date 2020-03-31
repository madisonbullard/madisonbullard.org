import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';

const AboutPanelDiv = withTheme(styled('div')`
	max-width: 900px;
	margin: auto;
	padding: 10px 20px;
	& p {
    font-size: 2.8vmin;
    @media (max-width: 1200px) {
      font-size: 2.8vmax;
    }
    @media (max-width: 900px) {
      font-size: 4.2vw;
    }
    @media (max-height: 520px) {
      font-size: 4vw;
    }
    margin: 14px 0;
    color: #444;
    & a {
      color: #333;
      &:hover{
        color: #111;
      }
    }
  }
`)

// const HueFilterSpan = styled('span')`
// 	filter: hue-rotate(${props => props.rotAngle}deg);
// `

const AboutPanel = () => {
	return(
		<AboutPanelDiv>
			<p>Hi!</p>
			<p>I am a developer with a strong interest in React. Take a look at my <a href="http://www.github.com/madisonbullard" target="_blank" rel="noopener">github</a>I'm currently on the frontend team at <a href="http://sureapp.com" target="_blank" rel="noopener">SURE</a>.</p>
			<p>You can find me on <a href="https://twitter.com/_madison______" target="_blank" rel="noopener">twitter</a>, <a href="https://soundcloud.com/madisonbullard" target="_blank" rel="noopener">soundcloud</a>, and <a href="http://linkedin.com/in/madisonbullard" target="_blank" rel="noopener">linkedin</a>.</p>
		</AboutPanelDiv>
	)
}

export default AboutPanel

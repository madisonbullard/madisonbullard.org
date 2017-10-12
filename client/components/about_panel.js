import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'theming';

const AboutPanelDiv = withTheme(styled('div')`
	max-width: 900px;
	margin: 0 auto;
	padding: 10px 30px;
	& p, button {
		font-size: 5vw;
		@media (min-width: 750px) {
			font-size: 2.4rem;
	  }
	}
	& p {
		margin: 16px 0;
		color: #444;
		& a {
			color: #333;
			&:hover{
				color: #111;
			}
		}
	}
	& button {
		width: 400px;
		height: 90px;
		background: ${props => props.theme.color};
		border: 0;
		font-family: Krungthep;
		color: #111;
	}
`)

const HueFilterSpan = styled('span')`
	filter: hue-rotate(${props => props.rotAngle}deg);
`

const AboutPanel = ({counter}) => {
	return(
		<AboutPanelDiv>
			<p>Hi!</p>
			<p>I am a javascript developer with a strong interest in React. Take a look at my <a href="http://www.github.com/madisonbullard" target="_blank">github</a>, or <a href="http://www.cornerstoneagency.com" target="_blank">this site</a> I built for Cornerstone Agency (not React tho <HueFilterSpan rotAngle={counter}>😕</HueFilterSpan>). I am currently senior motion graphics designer at <a href="http://thefader.com" target="_blank">The FADER</a>, but looking to  shift to full-time web dev.</p>
			<p>You can find me on <a href="https://twitter.com/_madison______" target="_blank">twitter</a>, <a href="https://soundcloud.com/madisonbullard" target="_blank">soundcloud</a>, and also <a href="http://linkedin.com/in/madisonbullard" target="blank">linkedin</a> if you’re into that.</p>
		</AboutPanelDiv>
	)
}

export default AboutPanel
import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'theming';

const AboutPanelDiv = withTheme(styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	font-family: Krungthep;
	& h1 {
		text-align: center;
		width: 100%;
    font-size: 96px;
    font-family: Gandur;
    font-weight: normal;
    margin: 0;
    color: ${props => props.theme.color};
    background-color: #777;
    @media (max-width: 515px) {
			font-size: 18vw;
	  }
	}
	& div {
		max-width: 900px;
		margin: 10px;
	}
	& p, button {
		font-size: 5vw;
		@media (min-width: 900px) {
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
		width: 100%;
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
			<h1>Madison Bullard</h1>
			<div>
				<p>Hi!</p>
				<p>I am a javascript developer with a strong interest in React. Take a look at my <a href="http://www.github.com/madisonbullard" target="_blank">github</a>, or <a href="http://www.cornerstoneagency.com" target="_blank">this site</a> I built for Cornerstone Agency (not React tho <HueFilterSpan rotAngle={counter}>😕</HueFilterSpan>). I am currently senior motion graphics designer at <a href="http://thefader.com" target="_blank">the FADER</a>, but looking to  shift to full-time web dev.</p>
				<p>You can find me on <a href="https://twitter.com/_madison______" target="_blank">twitter</a>, <a href="https://soundcloud.com/madisonbullard" target="_blank">soundcloud</a>, and also <a href="http://linkedin.com/in/madisonbullard" target="blank">linkedin</a> if you’re into that.</p>
			</div>
			<button><HueFilterSpan rotAngle={counter+120}>👉</HueFilterSpan> I <span>will</span> respond to your email <HueFilterSpan rotAngle={counter+240}>👈</HueFilterSpan></button>
		</AboutPanelDiv>
	)
}

export default AboutPanel
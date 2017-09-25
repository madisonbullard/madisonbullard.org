import React, { Component } from 'react';
import styled from 'react-emotion';

const AboutPanelDiv = styled('div')`
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
    color: #FBFA4F;
    background-color: #777;
	}
	& div {
		max-width: 900px;
	}
	& p, button {
		font-size: 5vw;
		@media (min-width: 900px) {
			font-size: 2.7rem;
	  }
	}
	& p {
		margin: 8px 0;
		color: #444;
		& a {
			color: #333;
			&:hover{
				color: #111;
			}
		}
	  & span {
	  	filter: hue-rotate(${props => Math.floor(props.rotAngle)}deg);
	  }
	}
	& button {
		width: 100%;
		height: 90px;
		background: #FBFA4F;
		border: 0;
		font-family: Krungthep;
		color: #111;
		& span{
			text-decoration: underline;
		}
	}
`

const AboutPanel = ({counter}) => {

		return(
			<AboutPanelDiv rotAngle={counter}>
				<h1>Madison Bullard</h1>
				<div>
					<p>Hi!</p>
					<p>I am a javascript developer with a strong interest in React. Take a look at my <a href="http://www.github.com/madisonbullard" target="_blank">github</a>, or <a href="http://www.cornerstoneagency.com" target="_blank">this site</a> I built for Cornerstone Agency (not React tho <span>😕</span>). I am currently senior motion graphics designer at <a href="http://thefader.com" target="_blank">the FADER</a>, but looking to  shift to full-time web dev.</p>
					<p>You can find me on <a href="https://twitter.com/_madison______" target="_blank">twitter</a>, <a href="https://soundcloud.com/madisonbullard" target="_blank">soundcloud</a>, and also <a href="http://linkedin.com/in/madisonbullard" target="blank">linkedin</a> if you’re into that.</p>
				</div>
				<button>I <span>will</span> respond to your email</button>
			</AboutPanelDiv>
		)
}

export default AboutPanel
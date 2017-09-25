import React, { Component } from 'react';
import styled from 'react-emotion';

const AboutPanelDiv = styled('div')`
	display: flex;
	flex-direction: column;
  align-items: center;
  justify-content: center;
	font-family: Krungthep;
	padding: 10px 15px;

	border-radius: 3px;
	& h1 {
		text-align: center;
	  font-size: 3rem;
	  font-family: Gandur;
	  font-weight: regular;
	  margin: 0;
	}
	& p, button {
		font-size: .9rem;
	}
	& p {
		margin: 8px 0;
	}
	& button {
		width: 275px;
		height: 50px;
		background: #FF8F46;
		border-radius: 7px;
		border: 0;
		font-family: Krungthep;
		color: #FBFBFB;
		margin: 30px 0 8px;
		& span{
			text-decoration: underline;
		}
	}
`

class AboutPanel extends Component {
	
	shouldComponentUpdate() {
    return false;
  }

	render(){
		return(
			<AboutPanelDiv>
				<div>
					<p>Hi!</p>
					<p>I am a javascript developer with a strong interest in React. Take a look at my <a href="http://www.github.com/madisonbullard" target="_blank">github</a>, or <a href="http://www.cornerstoneagency.com" target="_blank">this site</a> I built for Cornerstone Agency (not React tho 😕). I am currently senior motion graphics designer at <a href="http://thefader.com" target="_blank">the FADER</a>, but looking to  shift to full-time web dev.</p>
					<p>You can find me on <a href="https://twitter.com/_madison______" target="_blank">twitter</a>, <a href="https://soundcloud.com/madisonbullard" target="_blank">soundcloud</a>, and also <a href="http://linkedin.com/in/madisonbullard" target="blank">linkedin</a> if you’re into that.</p>
				</div>
				<button>I <span>will</span> respond to your email</button>
			</AboutPanelDiv>
		)
	}
}

export default AboutPanel
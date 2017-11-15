import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import textShadow from './text_shadow';
import animationDriver from './animation_driver';

const EmailButton = withTheme(styled('button')`
	font-size: 1.6rem;
	width: 500px;
	border-radius: 10px;
	margin: auto;
	padding: 0;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  @media (max-width: 500px){
	  margin: auto 8px 8px;
		width: auto;
		padding: 0;
		font-size: 4.2vw;
  }
	@media (orientation: landscape) {
		font-size: 1.6rem;
  }
	height: ${props => props.theme.emailBarHeight}px;
	border: 0;
	font-family: Krungthep;
	overflow: hidden;
	& div {
		${props => animationDriver(props)};
		width: 100%;
		height: 100%;
		& div {
			transition: inherit;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			& p {
				margin: 0;
			}
		}
	}
`)

class EmailBar extends Component {
	constructor(props){
		super(props);
		this.state = { animationKeyframe: 0 }
	}

	incrementAnimationKeyframe(){
		this.setState((prevState) => {
			return({
				animationKeyframe: (prevState.animationKeyframe+1)%5
			})
		})
	}

	setTimeouts(callback, times = []){
		let totalTime = 0;
		const internalCallback = (callback, totalTime) => {
			setTimeout(callback, totalTime)
		}
		for (var time of times) {
			totalTime = time+totalTime;
			internalCallback(callback, totalTime)
		}
	}

	_onClick(){
		if (this.state.animationKeyframe == 0){
			const { transitionDuration, alertHold } = this.props.theme;
			this.setTimeouts(this.incrementAnimationKeyframe.bind(this), 
				[
					1, //set animationKeyframe: 2; immediately append hidden div above clicked div
					transitionDuration+alertHold, //set animationKeyframe: 3;
					10, //set animationKeyframe: 4;
					transitionDuration //set animationKeyframe: 0;
				])
			this.setState({
				animationKeyframe: 1
			});
		}
	}

	render(){
		const { children, copyText } = this.props;
		const { animationKeyframe } = this.state;
		return(
			<CopyToClipboard text={copyText}>
				<EmailButton onClick={this._onClick.bind(this)} animationKeyframe={animationKeyframe}>
					<div>
						{animationKeyframe == 0 
							? React.Children.toArray(children)[1]
							: animationKeyframe >= 3 
							? React.Children.toArray(children).reverse() 
							: children}
					</div>
				</EmailButton>
			</CopyToClipboard>
		)
	}
}

export default EmailBar

import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import textShadow from './text_shadow';
import animationDriver from './animation_driver';

const EmailButton = withTheme(styled('button')`
	${props => animationDriver(props)};
	font-size: 1.6rem;
	width: 500px;
	border-radius: 10px;
	margin: auto;
	padding: 0;
  @media (max-width: 500px){
	  margin: auto auto 0;
		width: 100%;
		padding: 0;
		border-radius: 0px;
		font-size: 4.7vw;
  }
	@media (orientation: landscape) {
		font-size: 1.6rem;
  }
	height: ${props => props.theme.emailBarHeight}px;
	border: 0;
	font-family: Krungthep;
	overflow: hidden;
	& div {
		transition: inherit;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		${props => textShadow(props.theme.headerTextShadowForeground, props.theme.headerTextShadowBackground)};
	}
	& div p {
		margin: 0;
	}
`)

class EmailBar extends Component {
	constructor(props){
		super(props);
		this.state = { animationStage: 0 }
	}

	incrementAnimationStage(){
		console.log('animationStage: ', this.state.animationStage)
		this.setState((prevState) => {
			return({
				animationStage: (prevState.animationStage+1)%5
			})
		})
		console.log('animationStage: ', this.state.animationStage)
	}

	setTimeouts(callback, times = []){
		let totalTime = 0;
		const internalCallback = (callback, totalTime) => {
			setTimeout(callback, totalTime)
		}
		for (var time of times) {
			totalTime = time+totalTime;
			console.log(totalTime)
			internalCallback(callback, totalTime)
		}
	}

	_onClick(){
		if (this.state.animationStage == 0){
			console.log('animationStage: ', this.state.animationStage)
			const { transitionDuration, alertHold } = this.props.theme;
			this.setTimeouts(this.incrementAnimationStage.bind(this), 
				[
					1, //set animationStage: 2; immediately append hidden div above clicked div
					transitionDuration+alertHold, //set animationStage: 3;
					10, //set animationStage: 4;
					transitionDuration //set aniationStage: 0;
				])
			this.setState({
				animationStage: 1
			});
		}
	}

	render(){
		const { children, copyText } = this.props;
		const { animationStage } = this.state;
		return(
			<CopyToClipboard text={copyText}>
				<EmailButton onClick={this._onClick.bind(this)} animationStage={animationStage}>
					{animationStage == 0 
						? React.Children.toArray(children)[1]
						: animationStage >= 3 
						? React.Children.toArray(children).reverse() 
						: children}
				</EmailButton>
			</CopyToClipboard>
		)
	}
}

export default EmailBar

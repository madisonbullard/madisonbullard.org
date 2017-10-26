import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { textShadow } from './text_shadow';

const EmailButton = withTheme(styled('button')`
	transition: all ${props => (
			props.animationStage%2 !== 0
			? props.theme.transitionDuration
			: 0
		)}ms cubic-bezier(.32,.01,.1,1);
	font-size: 1.6rem;

	width: 500px;
	border-radius: 40px;
	margin: auto;
  @media (max-width: 475px){
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
	background: ${props => (
			props.animationStage == 0
			? props.theme.color
			: props.animationStage == 3
			? props.theme.color
			: props.theme.colorSelectedActive
		)};
	border: 0;
	font-family: Krungthep;
	overflow: hidden;
	& div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		${props => textShadow(props.theme.headerTextShadowForeground, props.theme.headerTextShadowBackground)};
	}
	& div:first-child{
		margin-top: ${props => (
				props.animationStage%2 !== 1
				? -props.theme.emailBarHeight
				: 0
			)}px;
		color: ${props => (
				props.animationStage < 2
			  ? props.theme.colorSelectedText
			  : props.theme.colorText
			)};
		transition: inherit;
	}
	& div:nth-child(2){
		color: ${props => (
				props.animationStage >= 2
			  ? props.theme.colorSelectedText
			  : props.theme.colorText
			)};
		transition: inherit;
	}
	& div p {
		margin: 0;
	}
`)

class EmailBar extends Component {
	constructor(props){
		super(props);
		this.state = { animationStage: 0, timeoutId: [] }
	}

	advanceAnimationStage(num){
		const timeoutId = this.state.timeoutId[num];
		clearTimeout(timeoutId);
		this.setState((prevState) => {
			return({
				animationStage: (prevState.animationStage + 1)%4
			})
		})
	}

	_onClick(){
		if (this.state.animationStage == 0){
			const { transitionDuration, alertHold } = this.props.theme;
			const timeoutId0 = setTimeout(
					() => {this.advanceAnimationStage(0)},
					transitionDuration+alertHold
				);
			const timeoutId1 = setTimeout(
					() => {this.advanceAnimationStage(1)}, 
					transitionDuration+alertHold+10
				);
			const timeoutId2 = setTimeout(
					() => {this.advanceAnimationStage(2)}, 
					transitionDuration+alertHold+10+transitionDuration
				);
			this.setState({
				timeoutId: [timeoutId0, timeoutId1, timeoutId2],
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
					{animationStage >= 2 ? React.Children.toArray(children).reverse() : children}
				</EmailButton>
			</CopyToClipboard>
		)
	}
}

export default EmailBar
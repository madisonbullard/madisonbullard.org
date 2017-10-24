import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const EmailButton = withTheme(styled('button')`
	transition: all ${props => (
			props.animationStage%2 !== 0
			? props.theme.transitionDuration
			: 0
		)}ms cubic-bezier(.32,.01,.1,1);
	font-size: 5vw;
	@media (min-width: 700px){
		font-size: 2.4rem;
  }
	@media (orientation: landscape) {
		font-size: 1.6rem;
		margin: 0 auto 30px;
		width: 500px;
		border-radius: 40px;
  }
	width: 100%;
	padding: 0;
	height: ${props => props.theme.emailBarHeight}px;
	background: ${props => (
			props.animationStage == 0
			? props.theme.color
			: props.animationStage == 3
			? props.theme.color
			: props.theme.colorSelected
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
	}
	& div:first-child{
		margin-top: ${props => (
				props.animationStage%2 !== 1
				? -props.theme.emailBarHeight
				: 0
			)}px;
		color: ${props => (
				props.animationStage < 2
			  ? props.theme.colorSelectedFont
			  : props.theme.colorFont
			)};
		transition: inherit;
	}
	& div:nth-child(2){
		color: ${props => (
				props.animationStage >= 2
			  ? props.theme.colorSelectedFont
			  : props.theme.colorFont
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
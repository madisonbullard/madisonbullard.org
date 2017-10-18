import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'theming';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const EmailButton = withTheme(styled('button')`
	font-size: 5vw;
	@media (min-width: 700px){
		font-size: 2.4rem;
  }
	width: 100%;
	height: ${props => props.theme.emailBarHeight}px;
	@media (orientation: landscape) {
		margin: 0 auto 30px;
		width: 500px;
		font-size: 1.6rem;
  }
	background: ${props => props.theme.color};
	border: 0;
	font-family: Krungthep;
	color: #111;
`)

const HueFilterSpan = styled('span')`
	filter: hue-rotate(${props => props.rotAngle}deg);
`

const UnderlineSpan = styled('span')`
	text-decoration: underline;
`

const EmailBar = ({counter}) => {

	return(
		<CopyToClipboard text='madison.bullard@gmail.com'>
			<EmailButton>
				<HueFilterSpan rotAngle={counter+120}>👉</HueFilterSpan> I <UnderlineSpan>will</UnderlineSpan> respond to your email <HueFilterSpan rotAngle={counter+240}>👈</HueFilterSpan>
			</EmailButton>
		</CopyToClipboard>
	)
}

export default EmailBar
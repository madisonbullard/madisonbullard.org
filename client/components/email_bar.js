import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'theming';

const EmailButton = withTheme(styled('button')`
	font-size: 5vw;
	@media (min-width: 900px) {
		font-size: 2.4rem;
  }
	width: 100%;
	height: ${props => props.theme.emailBarHeight}px;
	@media (max-width: 414px) {
		height: 75px;
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
		<EmailButton>
			<HueFilterSpan rotAngle={counter+120}>👉</HueFilterSpan> I <UnderlineSpan>will</UnderlineSpan> respond to your email <HueFilterSpan rotAngle={counter+240}>👈</HueFilterSpan>
		</EmailButton>
	)
}

export default EmailBar
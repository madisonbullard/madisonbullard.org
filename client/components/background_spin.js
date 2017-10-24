import React from 'react';
import styled from 'react-emotion';
import emojiHandhsake from '../img/handshake.png';

const SpinContainer = styled('div')`
	display: flex;
  align-items: center;
  justify-content: center;
	height: 100%;
	grid-area: 1 / 1 / -1 / -1;
  z-index: -999;
	overflow: hidden;
	background-color: #ddd;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const degToRad = (deg) => {
	return deg * (Math.PI / 180)
}

const handshakeHeight = 70;

const SpinningImg = styled('img')`
	height: 100%;
	flex-shrink: 0;
	image-rendering: pixelated;
  filter: grayscale(100%);
  -webkit-transform: translateY(${props => Math.sin(degToRad(props.rotAngle)) * handshakeHeight}px);
`

const BackgroundSpin = ({counter}) => {
	return(
		<SpinContainer>
			<SpinningImg src={ emojiHandhsake } rotAngle={counter}/>
		</SpinContainer>
	)
}

export default BackgroundSpin
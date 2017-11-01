import React from 'react';
import styled from 'react-emotion';
import emojiHandhsake from '../img/handshake.png';

const SpinContainer = styled('div')`
	position: absolute;
	top   : 0;
	left  : 0;
	bottom: 0;
	right : 0;
	display: flex;
  align-items: center;
  justify-content: center;
	height: 100%;
  z-index: -999;
	overflow: hidden;
	background-color: #ddd;
  user-select: none;
`

const degToRad = (deg) => {
	return deg * (Math.PI / 180)
}

const handshakeHeight = 70;

const SpinningImg = styled('img')`
	height: 100%;
	min-height: 100%;
	flex-shrink: 0;
	image-rendering: pixelated;
  filter: grayscale(100%);
  -webkit-transform: translateY(${props => Math.sin(degToRad(props.rotAngle)) * handshakeHeight}px);
  @media (max-width: 500px){
	  opacity: 0.4;
  }
`

const BackgroundSpin = ({counter}) => {
	return(
		<SpinContainer>
			<SpinningImg src={ emojiHandhsake } rotAngle={counter}/>
		</SpinContainer>
	)
}

export default BackgroundSpin
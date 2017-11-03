import React from 'react';
import styled from 'react-emotion';
import { keyframes, css } from 'emotion';
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

const upDown = keyframes`
	to { transform: translatey(80px); }
`

const handshakeHeight = 60;

const handshakeAnimation = ({isMobile, rotAngle}) => {
	console.log(isMobile)
	if (isMobile) {
		return css`
			animation: ${upDown} 1.5s alternate infinite ease-in-out;
			transform: translatey(-70px);
		`
	} else {
		return css`transform: translateY(${props => Math.sin(degToRad(rotAngle)) * handshakeHeight}px);`
	}
}

const degToRad = (deg) => {
	return deg * (Math.PI / 180)
}

const SpinningImg = styled('img')`
	height: 100%;
	min-height: 100%;
	flex-shrink: 0;
	image-rendering: pixelated;
  filter: grayscale(100%);
  will-change: transform;
	${props => handshakeAnimation(props)};
  @media (max-width: 500px){
	  opacity: 0.4;
  }
`

const BackgroundSpin = ({counter, isMobile}) => {
	if (isMobile === undefined){
		return <SpinContainer />
	} else {
		return(
			<SpinContainer>
				<SpinningImg src={emojiHandhsake} rotAngle={counter} isMobile={isMobile}/>
			</SpinContainer>
		)
	}
}

export default BackgroundSpin
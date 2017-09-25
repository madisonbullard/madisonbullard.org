import React from 'react';
import styled from 'react-emotion';
// import emojiHandhsake from '../img/handshake.png';

const SpinContainer = styled('div')`
	display: flex;
  align-items: center;
  justify-content: center;
	height: 100%;
	grid-area: 1 / 1 / -1 / -1;
  z-index: -999;
	overflow: hidden;
`

const SpinningImg = styled('img')`
	height: 100%;
	flex-shrink: 0;
	image-rendering: pixelated;
  filter: grayscale(100%);
  -webkit-transform: rotate(${props => Math.floor(props.rotAngle)}deg);
`

const BackgroundSpin = ({counter}) => {
	return(
		<SpinContainer>
			<SpinningImg src={require('../img/handshake.png')} rotAngle={counter}/>
		</SpinContainer>
	)
}

export default BackgroundSpin
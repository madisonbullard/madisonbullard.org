import React, { Component } from 'react';
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
  -webkit-transform: rotate(${props => props.rotAngle}deg);

`

class BackgroundSpin extends Component {
  constructor(props) {
    super(props);
    // this.state = { x: 0, y: 0, counter: 0};
  }

  // _onMouseMove(e) {
  // 	e.persist();
  //   this.setState((prevState, props) => {
	 //  	const { x, y } = this.state;
	 //  	const increment = Math.abs(e.screenX-prevState.x) + Math.abs(e.screenY-prevState.y);
	 //  	const rate = 0.2;
  // 		return ({
  // 			counter: (prevState.counter+increment*rate)%360,
  // 			x: e.screenX, 
  // 			y: e.screenY 
  // 		})
  // 	})
  // }

	render(){
		return(
			<SpinContainer>
				<SpinningImg src={require('../img/handshake.png')} rotAngle={this.props.counter}/>
			</SpinContainer>
		)
	}
}

export default BackgroundSpin
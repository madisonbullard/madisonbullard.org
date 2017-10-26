import React from 'react';
import { css } from 'react-emotion';

import textShadow from './text_shadow';

const animationDriver = (props) => {
	return (
		css`

			transition: all ${
				props.animationStage%2 !== 0
				? props.theme.transitionDuration
				: 0
			}ms cubic-bezier(.32,.01,.1,1);

			background: ${
				props.animationStage == 0
				? props.theme.color
				: props.animationStage == 3
				? props.theme.color
				: props.theme.colorSelectedActive
			};

			& div:first-child{
				margin-top: ${
						props.animationStage%2 !== 1
						? -props.theme.emailBarHeight
						: 0
					}px;
				${
					props.animationStage < 2
				  ? textShadow(props.theme.buttonTextShadowForeground, props.theme.buttonTextShadowBackground)
				  : textShadow(props.theme.headerTextShadowForeground, props.theme.headerTextShadowBackground)
				};
				color: ${
						props.animationStage < 2
					  ? props.theme.colorSelectedText
					  : props.theme.colorText
					};
			}

			& div:nth-child(2){
				color: ${
						props.animationStage >= 2
					  ? props.theme.colorSelectedText
					  : props.theme.colorText
					};
				${
					props.animationStage >= 2
				  ? textShadow(props.theme.buttonTextShadowForeground, props.theme.buttonTextShadowBackground)
				  : textShadow(props.theme.headerTextShadowForeground, props.theme.headerTextShadowBackground)
				};
			}
		`
	)
}



export default animationDriver

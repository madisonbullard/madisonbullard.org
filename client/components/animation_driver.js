import React from 'react';
import { css } from 'react-emotion';

import textShadow from './text_shadow';

const animationDriver = ({theme, animationStage}) => {
	return (
		css`

			transition: all ${
				animationStage%2 !== 0
				? theme.transitionDuration
				: 0
			}ms cubic-bezier(.32,.01,.1,1);

			background: ${
				animationStage == 0
				? theme.color
				: animationStage == 3
				? theme.color
				: theme.colorSelectedActive
			};

			& div:first-child{
				margin-top: ${
						animationStage%2 !== 1
						? -theme.emailBarHeight
						: 0
					}px;
				${
					animationStage < 2
				  ? textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)
				  : textShadow(theme.headerTextShadowForeground, theme.headerTextShadowBackground)
				};
				color: ${
						animationStage < 2
					  ? theme.colorSelectedText
					  : theme.colorText
					};
			}

			& div:nth-child(2){
				color: ${
						animationStage >= 2
					  ? theme.colorSelectedText
					  : theme.colorText
					};
				${
					animationStage >= 2
				  ? textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)
				  : textShadow(theme.headerTextShadowForeground, theme.headerTextShadowBackground)
				};
			}
		`
	)
}



export default animationDriver

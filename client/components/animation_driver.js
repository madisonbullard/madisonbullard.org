import React from 'react';
import { css } from 'react-emotion';

import textShadow from './text_shadow';

const animationDriver = ({theme, animationStage}) => {
	switch (animationStage) {
		case 0: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.color};
				transform: translateY(0px);
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					color: ${theme.colorSelectedText};
				}
			`)
		case 1: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.color};
				
				transform: translateY(${-theme.emailBarHeight/2}px);
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					color: ${theme.colorSelectedText};
				}
				& div:nth-child(2){
					color: ${theme.colorText};
					${textShadow(theme.headerTextShadowForeground, theme.headerTextShadowBackground)};
				}
			`)
		case 2: return (
			css`
				transition: all ${theme.transitionDuration}ms ${theme.animationRate};
				background: ${theme.colorSelectedActive};
				
				transform: translateY(0px);
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					color: ${theme.colorSelectedText};
				}
				& div:nth-child(2){
					color: ${theme.colorText};
					${textShadow(theme.headerTextShadowForeground, theme.headerTextShadowBackground)};
				}
			`)
		case 3: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.colorSelectedActive};
				
				transform: translateY(${-theme.emailBarHeight/2}px);
				& div:first-child{
					${textShadow(theme.headerTextShadowForeground, theme.headerTextShadowBackground)};
					color: ${theme.colorText};
				}
				& div:nth-child(2){
					color: ${theme.colorSelectedText};
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
				}
			`)
		case 4: return (
			css`
				transition: all ${theme.transitionDuration}ms ${theme.animationRate};
				background: ${theme.color};
				
				transform: translateY(0px);
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					color: ${theme.colorText};
				}
				& div:nth-child(2){
					color: ${theme.colorSelectedText};
					${textShadow(theme.headerTextShadowForeground, theme.headerTextShadowBackground)};
				}
			`)
	}
}

export default animationDriver

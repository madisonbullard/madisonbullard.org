import React from 'react';
import { css } from 'react-emotion';

import textShadow from './text_shadow';

const animationDriver = ({theme, animationStage}) => {
	switch (animationStage) {
		case 0: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.color};
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					margin-top: 0px;
					color: ${theme.colorSelectedText};
				}
			`)
		case 1: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.color};
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					margin-top: ${-theme.emailBarHeight}px;
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
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					margin-top: 0px;
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
				& div:first-child{
					${textShadow(theme.headerTextShadowForeground, theme.headerTextShadowBackground)};
					margin-top: ${-theme.emailBarHeight}px;
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
				& div:first-child{
					${textShadow(theme.buttonTextShadowForeground, theme.buttonTextShadowBackground)};
					margin-top: 0px;
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

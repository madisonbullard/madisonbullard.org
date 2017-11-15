import React from 'react';
import { css } from 'react-emotion';

const animationDriver = ({theme, animationKeyframe}) => {
	switch (animationKeyframe) {
		case 0: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.color};
				&:hover {
					transition: all ${theme.transitionDuration}ms ease;
					background: ${theme.colorHover};
				}
				transform: translateY(0px);
				& div:first-child{
					color: ${theme.colorText};
				}
			`)
		case 1: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.color};
				
				transform: translateY(${-theme.emailBarHeight/2}px);
				& div:first-child{
					color: ${theme.colorSelectedText};
				}
				& div:nth-child(2){
					color: ${theme.colorText};
				}
			`)
		case 2: return (
			css`
				transition: all ${theme.transitionDuration}ms ${theme.animationRate};
				background: ${theme.colorSelectedActive};
				
				transform: translateY(0px);
				& div:first-child{
					color: ${theme.colorSelectedText};
				}
				& div:nth-child(2){
					color: ${theme.colorText};
				}
			`)
		case 3: return (
			css`
				transition: all 0ms ${theme.animationRate};
				background: ${theme.colorSelectedActive};
				
				transform: translateY(${-theme.emailBarHeight/2}px);
				& div:first-child{
					color: ${theme.colorText};
				}
				& div:nth-child(2){
					color: ${theme.colorSelectedText};
				}
			`)
		case 4: return (
			css`
				transition: all ${theme.transitionDuration}ms ${theme.animationRate};
				background: ${theme.color};
				
				transform: translateY(0px);
				& div:first-child{
					color: ${theme.colorText};
				}
				& div:nth-child(2){
					color: ${theme.colorSelectedText};
				}
			`)
	}
}

export default animationDriver

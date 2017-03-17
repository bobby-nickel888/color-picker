import { GRADIENT_SEL_STYLE, GRADIENT_SEL_COLOR, GRADIENT_SEL_DIRECTION } from '../constants/actionTypes';

export function selectGradientStyle(selectedStyle) {
	return {
		type: GRADIENT_SEL_STYLE,
		selectedStyle
	}
}

export function selectGradientColor(index, color) {
	return {
		type: GRADIENT_SEL_COLOR,
		index,
		color
	}
}

export function selectGradientDirection(selectedDirection) {
	return {
		type: GRADIENT_SEL_DIRECTION,
		selectedDirection
	}
}
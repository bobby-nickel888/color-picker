import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	style: "Linear",
	direction: "Center",
	startPointColor: {r:0, g:0, b:0, a:1},
	endPointColor: {r:255, g:255, b:255, a:1}
};

function gradientForm(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GRADIENT_SEL_STYLE:
			return {
				...state,
				style: action.selectedStyle,
				direction: 'Top'
			};
		case actionTypes.GRADIENT_SEL_COLOR: 
			if (action.index == 0)
			{
				return {
					...state,
					startPointColor: action.color
				};
			} else {
				return {
					...state,
					endPointColor: action.color
				};
			}
		case actionTypes.GRADIENT_SEL_DIRECTION:
			return {
				...state,
				direction: action.selectedDirection
			};
		default:
			return state;
	}
}

const undoableGradientForm = undoable(gradientForm, {
  filter: distinctState()
})

export default undoableGradientForm
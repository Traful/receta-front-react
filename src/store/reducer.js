import { defaultData, RESET, SET_USER } from "./constantes";

const reducer = (state, action) => {
	switch(action.type) {
		case RESET:
			return defaultData;
		case SET_USER:
			return ({ ...state, user: action.payload });
		default:
			console.error(`${action.type} no se reconoce y por lo tanto no posee handler.`);
	}
	return state;
};

export default reducer;
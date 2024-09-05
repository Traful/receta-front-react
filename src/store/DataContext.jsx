//import { useReducer, useMemo } from "react";
import { useReducer } from "react";
import Contexto from "./Contexto";
import reducer from "./reducer";
import { defaultData } from "./constantes";

const DataContext = (props) => {
	const [state, dispatch] = useReducer(reducer, defaultData);
	//const obj = useMemo(() => ({ state, dispatch }), [state]);

	return(
		<Contexto.Provider value={{ state, dispatch }}>
			{ props.children }
		</Contexto.Provider>
	);
};

export default DataContext;
import { useContext } from "react";
import Contexto from "./store/Contexto";
//import Login from "./components/pages/Login";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SWRConfig } from "swr";
import { VITE_API_BASE_URL } from "./config";

// import WebexData from "./components/webex/webexstore/WebexData";

const fetcherWhithContext = (baseUrl, token) => {
	return async (resource, init) => {
		try {
			let response = await fetch(
				`${baseUrl}${resource}`,
				{
					...init,
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				}
			);
			let json = await response.json();
			if(response.ok) {
				return json;
			} else {
				console.error(json);
			}
		} catch (error) {
			console.error(error);
		}
		return null;
	};
};

const App = () => {
	const contexto = useContext(Contexto);

	return(
		<div className="App"> 
			<SWRConfig value={{
				refreshInterval: 0,
				fetcher: fetcherWhithContext(VITE_API_BASE_URL, contexto.state.user.token)
			}}>
				<RouterProvider router={router} />
			</SWRConfig>
		</div>
	);
};

export default App;
import { JaaSMeeting } from "@jitsi/react-sdk";
import { useEffect, useState } from "react";
import SpinnerView from "./SpinnerView";
import { VITE_JITSI_APP_ID, VITE_API_BASE_URL } from "../../config";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

const RemoteReunion = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const location = useLocation();
  	const queryParams = new URLSearchParams(location.search);

	const [data, setData] = useState(null);

	useEffect(() => {
		const getToken = async () => {
			try {
				/*
				let newDataReunion = {
					nombreSala: nombreSala,
					user: {
						"hidden-from-recorder": false,
						moderator: true,
						name: "Muni-1",
						id: uuid(),
						avatar: "",
						email: "muni1@muni1.com"
					}
				};
				*/
				const token = queryParams.get("token");
				const decodedToken = jwtDecode(token);

				let newDataReunion = {
					nombreSala: decodedToken.data.nombreSala,
					user: {
						"hidden-from-recorder": false,
						moderator: false,
						name: decodedToken.data.nombre,
						id: uuid(),
						avatar: "",
						email: decodedToken.data.email
					}
				};

				let response = await fetch(`${VITE_API_BASE_URL}jitsi/token`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newDataReunion)
				});
				let json = await response.json();
				if(json.ok) {
					setData({
						roomName: decodedToken.data.nombreSala,
						token: json.token
					});
				} else {
					setError(json.msg);
				}

			} catch(error) {
				setError(error.message);
			}
		};
		getToken().finally(setLoading(false));
	}, []);

	if(loading) return <SpinnerView />;
	
	if(error) {
		return(
			<div className="min-h-screen w-full flex justify-center items-center bg-red-300">
				<p>{ error }</p>
			</div>
		);
	}

	if(!data) {
		return(
			<div className="min-h-screen w-full flex justify-center items-center bg-red-300">
				<p>Ocurrió un error al intentar generar la reunión.</p>
			</div>
		);
	}

	return(
		<div className="RemoteReunion relative min-h-screen w-full bg-black">
			<JaaSMeeting
				lang="es"
				appId = { VITE_JITSI_APP_ID }
				roomName = { data.roomName}
				jwt = { data.token }
				configOverwrite = {{
					disableThirdPartyRequests: true,
					disableLocalVideoFlip: true,
					backgroundAlpha: 0.5
				}}
				interfaceConfigOverwrite = {{
					VIDEO_LAYOUT_FIT: "nocrop",
					MOBILE_APP_PROMO: false,
					TILE_VIEW_MAX_COLUMNS: 4
				}}
				spinner = { SpinnerView }
				getIFrameRef = { (divIFrameContain) => {
					console.log(divIFrameContain);
					let iframe = divIFrameContain.querySelector("iframe");
					// Cambia el ancho del iframe
					if(iframe) {
						iframe.style.position = "absolute";
						iframe.style.left = 0;
						iframe.style.top = 0;
						iframe.style.right = 0;
						iframe.style.bottom = 0;
					}
				}}
			/>
		</div>
	);
};

export default RemoteReunion;
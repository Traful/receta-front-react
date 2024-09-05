import { JaaSMeeting } from "@jitsi/react-sdk";
import { useEffect, useRef, useState } from "react";
import useJistiToken from "./useJistiToken";
import SpinnerView from "./SpinnerView";
import { VITE_JITSI_APP_ID } from "../../config";

const Reunion = ({ dataReunion }) => {
	const meetingWrapper = useRef(null);
	const [iFrame, setIFrame] = useState(null);
	const { loading, error, token } = useJistiToken(dataReunion);

	useEffect(() => {
		if(meetingWrapper.current) {
			meetingWrapper.current.addEventListener("resize", () => {
				console.log("Alo?");
			})
		}
	}, [meetingWrapper.current]);

	const changeSize = () => {
		if(meetingWrapper.current && iFrame) {
			let styleWrapper = meetingWrapper.current.style;
			let styleIFrame =  iFrame.style;
			styleWrapper.width = "150px";
			styleIFrame.width = "150px";
		}
	};

	if(loading) return <SpinnerView />;

	if(error) {
		return(
			<div className="min-h-screen w-full flex justify-center items-center bg-red-300">
				<p>{ error }</p>
			</div>
		);
	}

	return(
		<div className="Reunion relative min-h-screen w-full flex justify-center items-center bg-black">
			<div className="absolute right-4 top-4 text-white">
				<button type="button" onClick={changeSize}>[]</button>
			</div>
			<div ref={meetingWrapper} className="meetingWrapper">
				<JaaSMeeting
					lang="es"
					appId = { VITE_JITSI_APP_ID }
					roomName = { dataReunion.nombreSala }
					jwt = { token }
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
					onApiReady = { (externalApi) => { console.log(externalApi) } }
					getIFrameRef = { (divIFrameContain) => {
						let iframe = divIFrameContain.querySelector("iframe");
						// Cambia el ancho del iframe
						if(iframe) {
							setIFrame(iframe);
							iframe.style.width = "800px";
							iframe.style.height = "600px";
						} else {
							console.log("No se encontró el iframe dentro del div.");
						}
						console.log("ref:", divIFrameContain)
					}}
				/>
			</div>
		</div>
	);
};

export default Reunion;
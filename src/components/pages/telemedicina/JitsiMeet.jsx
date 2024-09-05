import { useState } from "react";
import { v4 as uuid } from "uuid";
import Medicos from "./../../jitsi/Medicos";
import Reunion from "./../../jitsi/Reunion";
import { VITE_API_BASE_URL } from "../../../config";

const JitsiMeet = () => {
	const [medico, setMedico] = useState(null);
	const [dataReunion, setDataReunion] = useState(null);

	const handleMedicoSelected = async (medico) => {
		let nombreSala = `TeleMedicina-${uuid()}`;

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

		setDataReunion(newDataReunion);

		try {
			let response = await fetch(`${VITE_API_BASE_URL}jitsi/invite`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ ...medico, nombreSala: nombreSala })
			});
			let json = await response.json();
			if(json.ok) {
				setMedico(medico);
			}
		} catch(error) {
			console.log(error);
		}
	};

	return(
		<div className="JitsiMeet p-8 flex justify-center items-center">
			<div className="p-8 border-2 border-gray-500">
				{
					(medico && dataReunion) ?
					<Reunion dataReunion={dataReunion} />
					:
					<Medicos onMedicoSelected={handleMedicoSelected} />
				}
			</div>
		</div>
	);
};

export default JitsiMeet;
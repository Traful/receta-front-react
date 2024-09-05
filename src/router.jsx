import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";

//Gestión Administrativa
import Agestion from "./components/pages/gestionadministrativa/Agestion";

//Servicio Médico
import PreReceta from "./components/pages/serviciomedico/PreReceta";
import Estudios from "./components/pages/serviciomedico/Estudios";

//Telemedicina
//import Turnos from "./components/pages/telemedicina/Turnos";
//import Asistentes from "./components/pages/telemedicina/Asistentes";
import JitsiMeet from "./components/pages/telemedicina/JitsiMeet";

//Pacientes
import Recetas from "./components/pages/pacientes/Recetas";
import Certificados from "./components/pages/pacientes/Certificados";
import PEstudios from "./components/pages/pacientes/PEstudios";
import Pacientes from "./components/pages/pacientes/Pacientes";

import Contexto from "./store/Contexto";
import { useContext } from "react";
import Login from "./components/pages/Login";


import RemoteReunion from "./components/jitsi/RemoteReunion";

const Protected = () => {
	const con = useContext(Contexto);

	return(
		<>
		{
			con.state.user.auth ?
			<Dashboard />
			:
			<Login />
		}
		</>
	);
};

export const router = createBrowserRouter([
	{
		//https://localhost:5173/tele/meeting/remote?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQyMDI1NjEsImRhdGEiOnsiaWQiOjEsIm5vbWJyZSI6IkhhbnMiLCJlbWFpbCI6ImhhbnNqYWxAZ21haWwuY29tIiwibm9tYnJlU2FsYSI6IlRlbGVNZWRpY2luYS04NDEyNjk3NC05M2U0LTQyZGEtOWViMC00OGVhZjg0MWNiYmEifSwiaWF0IjoxNzI0MTczNzYxfQ.9kFPrC-fjF1LR141qfP6KYVcGVyF73bMbzWdMg1mPQ4
		path: "tele/meeting/remote",
		element: <RemoteReunion />,
	},
	{
		path: "/",
		element: <Protected />,
		children: [
			{
				path: "gesadmin/auto",
				element: <Agestion />
			},
			{
				path: "servmedico/prereceta",
				element: <PreReceta />
			},
			{
				path: "servmedico/estudios",
				element: <Estudios />
			},
			/*
			{
				path: "tele/turnos",
				element: <Turnos />
			},
			{
				path: "tele/asistentes",
				element: <Asistentes />
			},
			*/
			{
				path: "tele/meetings",
				element: <JitsiMeet />
			},
			{
				path: "pacientes/recetas",
				element: <Recetas />
			},
			{
				path: "pacientes/certificados",
				element: <Certificados />
			},
			{
				path: "pacientes/estudios",
				element: <PEstudios />
			},
			{
				path: "pacientes/pacientes",
				element: <Pacientes />
			}
		]
	}
]);
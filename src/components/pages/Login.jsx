import { useContext, useState } from "react";
import Contexto from "./../../store/Contexto";
import { VITE_API_BASE_URL } from "./../../config";
import { SET_USER } from "./../../store/constantes"
import { toast } from "sonner";
import Logo from "./../ui/Logo";
import imagen from "./../../assets/undraw_medicine_b-1-ol.svg";
import { Button } from "flowbite-react";

const Login = () => {
	const contexto = useContext(Contexto);

	const [searching, setSearching] = useState(false);

	const [data, setData] = useState({
		matricula: "18157",
		password: "123123"
	});

	const handlechange = (event) => {
		let field = event.target.name;
		let value = event.target.value;
		setData(prev => ({ ...prev, [field]: value }));
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSearching(true);
		try {
			const respose = await fetch(`${VITE_API_BASE_URL}users/login`, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const json = await respose.json();
			if(respose.ok) {
				let data = ({
					auth: true,
					...json.data
				});
				contexto.dispatch({ type: SET_USER, payload: data });
			} else {
				toast.error(json?.message || "Error al procesar el login");
			}
		} catch(error) {
			toast.error(error.message);
		}
		setSearching(false);
	};

	return(
		<div className="min-h-screen flex w-full flex-col gap-2">
			<div className="max-w-[800px] w-full mx-auto mt-9">
				<Logo widthl={291.05} colorOne="#2d9f03" colorTwo="#4f4f4f" />
			</div>
			<div className="max-w-[800px] w-full mx-auto p-2 grow flex justify-center items-center gap-2">
				<div className="border border-blue-500 p-8 rounded-md formulario-glass">
					<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-1">
							<label htmlFor="matricula">Matrícula <span className="text-[.8rem] text-red-600">[Sin dígito verificador!]</span></label>
							<input className="py-1 px-2 rounded text-black border border-gray-700" type="text" name="matricula" id="matricula" value={data.matricula} onChange={handlechange} />
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="password">Contraseña</label>
							<input className="py-1 px-2 rounded text-black border border-gray-700" type="password" name="password" id="password" value={data.password} onChange={handlechange} />
						</div>
						<div className="flex justify-end mt-4 mb-2">
							<Button type="submit" color="dark" isProcessing={searching} disabled={searching}>Ingresar</Button>
						</div>
					</form>
				</div>
				<div>
					<img src={imagen} alt="Medico" />
				</div>
			</div>
			<div className="bg-gray-800 text-gray-300 text-sm flex justify-center items-center py-2 w-full">&copy; Consejo de Médicos de la Provincia de Córdoba</div>
		</div>
	);
};

export default Login;
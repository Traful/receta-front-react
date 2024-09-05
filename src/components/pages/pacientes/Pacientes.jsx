import PropTypes from "prop-types";
import { useState } from "react";
import useSWR from "swr";
import { Label, TextInput, Button } from "flowbite-react";
import { HiCreditCard } from "react-icons/hi";
import { toast } from "sonner";
import Spinner from "../../ui/Spinner";
import FormPaciente from "./ui/FormPaciente";
import { useApi } from "./../../../Api/api";
import { defaultPacienteData } from "../../../utils/constantes";

const Pacientes = ({ onFindPaciente }) => {
	const [dni, setDni] = useState("16082567");
	const [dniSelected, setDniSelected] = useState("");

	const { data, error, isLoading } = useSWR(dniSelected ? `pacientes/dni/${dniSelected}` : null, {
		onSuccess: (data) => {
			if(onFindPaciente && (typeof onFindPaciente === "function")) onFindPaciente(data.data[0]);
		}
	});

	const { apiPost, apiPut, error: apiError } = useApi();

	const handleChangeDni = (event) => {
		event.preventDefault();
		setDniSelected(dni);
	};

	const handleFormSumbitChange = async (dataChanged) => {
		//FEDE - VALIDACIONES
		try {
			await apiPut(`paciente/${dataChanged.id}`, dataChanged);
			toast.success("Paciente actualizado exitosamente.");
		} catch(err) {
			toast.error(err);
			toast.error(apiError);
		}
	};

	const handleFormSumbitNew = async (dataNew) => {
		//FEDE - VALIDACIONES
		try {
			let newPaciente = await apiPost("paciente", dataNew);
			toast.success("Paciente agregado exitosamente.");
			//Ver que devuelve, si devuelve el ID hay que disparar el evento del DNI seleccionado
			//caso contrario hay que ver como proceder
			onFindPaciente(newPaciente);
		} catch(err) {
			toast.error(err);
		}
	};
 
	if(error) return <div>failed to load</div>
	if(isLoading) return <Spinner />

	return(
		<div className="Pacientes">
			<h1>Pacientes</h1>
			<div>
				<div className="max-w-md">
					<form className="flex items-end gap-2" onSubmit={handleChangeDni}>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="fdni" value="Introducir Nro de DNI o pasaporte (extranjero)" />
							</div>
							<TextInput id="fdni" name="fdni" type="text" icon={HiCreditCard} required value={dni} onChange={(e) => setDni(e.target.value)} />
						</div>
						<Button type="submit">Buscar</Button>
					</form>
				</div>
			</div>
			<div>
				{
					dniSelected ?
					data?.data?.length > 0 ?
					<FormPaciente data={data.data[0]} onSubmit={handleFormSumbitChange} />
					:
					<FormPaciente data={{ ...defaultPacienteData, dni: dniSelected }} onSubmit={handleFormSumbitNew} />
					:
					null
				}
			</div>
		</div>
	);
};

Pacientes.propTypes = {
	onFindPaciente: PropTypes.func
};

export default Pacientes;
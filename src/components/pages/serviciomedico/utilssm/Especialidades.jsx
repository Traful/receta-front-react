import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import Contexto from "../../../../store/Contexto";
import { useApi } from "../../../../Api/api";
import { Label, Select } from "flowbite-react";

const Especialidades = ({ onEspecialidadChange }) => {
	const context = useContext(Contexto);
	const [especialidades, setEspecialidades] = useState([]);
	const [especialidadSelected, setEspecialidadSelected] = useState("99999");

	const { apiGet } = useApi();

	useEffect(() => {
		const getEspecialidades = async () => {
			let esp = await apiGet(`users/especialidades/${context.state.user.matricula}`)
			setEspecialidades(esp.data ? esp.data : []);
		};
		getEspecialidades();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.state.user.matricula]);

	const handleEspecialidadChange = (event) => {
		let val = event.target.value;
		setEspecialidadSelected(val);
		if(onEspecialidadChange && (typeof onEspecialidadChange === "function")) onEspecialidadChange(val);
	};

	return(
		<>
			<div className="mb-2 block">
				<Label htmlFor="especialidad" value="Especialidad" />
			</div>
			<Select id="especialidad" name="especialidad" value={especialidadSelected} onChange={handleEspecialidadChange}>
				<option value="99999">SIN ESPECIALIDAD</option>
				{
					especialidades.map(especialidad => <option key={especialidad.matricula_especialista} value={especialidad.matricula_especialista}>{especialidad.denominacion}</option>)
				}
			</Select>
		</>
	);
};

Especialidades.propTypes = {
	onEspecialidadChange: PropTypes.func
};

export default Especialidades;
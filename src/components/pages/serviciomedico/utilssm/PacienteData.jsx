import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
import ObrasSociales from "./ObrasSociales";
import Planes from "./Planes";

const PacienteData = ({ data, onChangeData }) => {
	const [dataSelected, setDataSelected] = useState(data);

	useEffect(() => {
		let newData = ({
			id: data.idpaciente,

			dni: data.paciente.dni,
			apellido: data.paciente.apellido,
			nombre: data.paciente.nombre,
			sexo: data.paciente.sexo,
			fecnac: data.paciente.fecnac,

			talla: data.talla,
			peso: data.peso,
			email: data.email,
			paistelef: data.paciente.paistelef,
			telefono: data.telefono,
			idobrasocial: data.idobrasocial,
			nromatriculadoc: data.nromatriculadoc,
			tipoplan: data.tipoplan
		});
		if(newData.fecnac.includes("T")) {
			newData.fecnac = newData.fecnac.split('T')[0];
		}
		setDataSelected(newData);
	}, [data]);

	const handleFormChange = (event) => {
		const field = event.target.name;
		const value = event.target.value;
		setDataSelected({ ...dataSelected, [field]: value });
		if(onChangeData && (typeof onChangeData === "function")) onChangeData({ ...dataSelected, [field]: value });
	};

	const handleObraSocialChange = (idObraSocialSelected) => {
		setDataSelected({ ...dataSelected, idobrasocial: idObraSocialSelected });
		onChangeData({ ...dataSelected, idobrasocial: idObraSocialSelected });
	};

	const handlePlanChange = (idPlanSelected) => {
		setDataSelected({ ...dataSelected, tipoplan: idPlanSelected });
		onChangeData({ ...dataSelected, tipoplan: idPlanSelected });
	};

	if(!dataSelected) return null;

	return(
		<div className="max-w-4xl w-full">
			<div className={`mt-4 mb-2 rounded-md p-2 text-white ${parseInt(data.id, 10) !== 0 ? "bg-blue-400" : "bg-green-400"}`}>{ parseInt(data.id, 10) !== 0 ? "Modificar Paciente" : "Agregar nuevo Paciente" }</div>
			<form className="mt-2">
				<div className="w-full flex gap-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="dni" value="DNI" />
						</div>
						<TextInput id="dni" name="dni" type="dni" defaultValue={dataSelected.dni} disabled readOnly />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="apellido" value="Apellido" />
						</div>
						<TextInput id="apellido" name="apellido" type="apellido" defaultValue={dataSelected.apellido} disabled readOnly />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="nombre" value="Nombre" />
						</div>
						<TextInput id="nombre" name="nombre" type="nombre" defaultValue={dataSelected.nombre} disabled readOnly />
					</div>
				</div>
				<div className="w-full flex gap-2 mt-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="fecnac" value="F. Nacimiento" />
						</div>
						<div className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-400 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg">{dataSelected.fecnac}</div>
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="sexo" value="Sexo" />
						</div>
						<Select id="sexo" name="sexo" value={dataSelected.sexo} disabled readOnly>
							<option value="F">Femenino</option>
							<option value="M">Masculino</option>
							<option value="O">Otro</option>
						</Select>
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="talla" value="Talla" />
						</div>
						<TextInput type="number" min="0" max="999" id="talla" name="talla" value={dataSelected.talla} onChange={handleFormChange} />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="peso" value="Peso" />
						</div>
						<TextInput type="number" min="0" max="999" id="peso" name="peso" value={dataSelected.peso} onChange={handleFormChange} />
					</div>
				</div>
				<div className="w-full md:flex md:gap-2 mt-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="email" value="E-Mail" />
						</div>
						<TextInput type="email" id="email" name="email" value={dataSelected.email} onChange={handleFormChange} />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="telefono" value="Teléfono" />
						</div>
						<TextInput type="text" id="telefono" name="telefono" value={dataSelected.telefono} onChange={handleFormChange} />
					</div>
				</div>
				<div className="w-full md:flex md:gap-2 mt-2">
					<div className="grow">
						<ObrasSociales defaultObraSocialId={parseInt(dataSelected.idobrasocial, 10)} onObraSocialChange={handleObraSocialChange} />
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="nromatriculadoc" value="N° Afiliado" />
						</div>
						<TextInput type="text" id="nromatriculadoc" name="nromatriculadoc" value={dataSelected.nromatriculadoc} onChange={handleFormChange} />
					</div>
				</div>
				<div className="w-full md:flex md:gap-2 mt-2">
					<div className="grow">
						<Planes idObraSocial={parseInt(dataSelected.idobrasocial, 10)} defaultSelected={dataSelected.tipoplan} onChangeSelected={handlePlanChange} />
					</div>
				</div>
			</form>
		</div>
	);
};

PacienteData.propTypes = {
	data: PropTypes.object,
	onChangeData: PropTypes.func
};

export default PacienteData;
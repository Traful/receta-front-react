import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Label, TextInput, Button, Select, Datepicker } from "flowbite-react";
import useSWR from "swr";

const FormPaciente = ({ data, onSubmit }) => {
	const [dataSelected, setDataSelected] = useState(data);
	const { data: obras } = useSWR("obrassociales");

	useEffect(() => {
		let newData = ({...data});
		if(newData.fecnac.includes("T")) {
			newData.fecnac = newData.fecnac.split('T')[0];
		}
		setDataSelected(newData);
	}, [data]);

	const handleFormChange = (event) => {
		const field = event.target.name;
		const value = event.target.value;
		setDataSelected({ ...dataSelected, [field]: value });
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();
		onSubmit(dataSelected);
	};

	if(!dataSelected) return null;

	return(
		<div className="max-w-4xl w-full">
			<div className={`mt-4 mb-2 rounded-md p-2 text-white ${parseInt(data.id, 10) !== 0 ? "bg-blue-400" : "bg-green-400"}`}>{ parseInt(data.id, 10) !== 0 ? "Modificar Paciente" : "Agregar nuevo Paciente" }</div>
			<form className="mt-2" onSubmit={handleSubmitForm}>
				<input type="hidden" name="id" id="id" value={dataSelected.id} />
				<div className="w-full flex gap-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="dni" value="DNI" />
						</div>
						<TextInput id="dni" name="dni" type="dni" value={dataSelected.dni} disabled readOnly />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="nromatriculadoc" value="N° Afiliado" />
						</div>
						<TextInput type="text" id="nromatriculadoc" name="nromatriculadoc" value={dataSelected.nromatriculadoc} placeholder="123456" required onChange={handleFormChange} />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="fecnac" value="F. Nacimiento" />
						</div>
						<Datepicker id="fecnac" name="fecnac" value={dataSelected.fecnac} required
							weekStart={1}
							language="es-ES"
							datepicker-format="dd/mm/yyyy"
							labelTodayButton="Hoy"
							labelClearButton="Limpiar"
							onSelectedDateChanged={(date) => {
								setDataSelected({ ...dataSelected, "fecnac": new Date(date).toISOString().split('T')[0] })
							}}
						/>
					</div>
				</div>
				<div className="w-full md:flex md:gap-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="apellido" value="Apellido" />
						</div>
						<TextInput id="apellido" name="apellido" type="apellido" value={dataSelected.apellido} placeholder="Doe" required onChange={handleFormChange} />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="nombre" value="Nombre" />
						</div>
						<TextInput id="nombre" name="nombre" type="nombre" value={dataSelected.nombre} placeholder="John" required onChange={handleFormChange} />
					</div>
				</div>
				<div className="w-full flex gap-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="sexo" value="Sexo" />
						</div>
						<Select id="sexo" name="sexo" value={dataSelected.sexo} required onChange={handleFormChange}>
							<option value="F">Femenino</option>
							<option value="M">Masculino</option>
							<option value="O">Otro</option>
						</Select>
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="talla" value="Talla" />
						</div>
						<TextInput type="number" min="0" max="999" id="talla" name="talla" value={dataSelected.talla} placeholder="170" required onChange={handleFormChange} />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="peso" value="Peso" />
						</div>
						<TextInput type="number" min="0" max="999" id="peso" name="peso" value={dataSelected.peso} placeholder="80" required onChange={handleFormChange} />
					</div>
				</div>
				<div className="w-full md:flex md:gap-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="email" value="E-Mail" />
						</div>
						<TextInput type="email" id="email" name="email" value={dataSelected.email} placeholder="mail@server.com" required onChange={handleFormChange} />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="telefono" value="Teléfono" />
						</div>
						<TextInput type="text" id="telefono" name="telefono" value={dataSelected.telefono} placeholder="2657445578" required onChange={handleFormChange} />
					</div>
				</div>
				<div className="w-full md:flex md:gap-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="idobrasocial" value="Obra Social" />
						</div>
						<Select id="idobrasocial" name="idobrasocial" value={dataSelected.idobrasocial} required onChange={handleFormChange}>
							{
								obras?.data && (obras.data.length > 0) ?
								obras.data.map(o => <option key={`o-${o.id}`} value={o.id}>{o.sigla.toUpperCase()}</option>)
								:
								null
							}
						</Select>
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="tipoplan" value="Tipo de Plan" />
						</div>
						<Select id="tipoplan" name="tipoplan" value={dataSelected.tipoplan} required onChange={handleFormChange}>
							<option value={2}>EXCEPCION</option>
							<option value={1}>MEJORAR</option>
						</Select>
					</div>
				</div>
				<div className="mt-2 flex justify-end">
					<Button type="submit">{ parseInt(data.id, 10) !== 0 ? "Guardar Cambios" : "Agregar paciente" }</Button>
				</div>
			</form>
		</div>
	);
};

FormPaciente.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func
};

export default FormPaciente;
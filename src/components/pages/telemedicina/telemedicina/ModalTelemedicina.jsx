import { useState, useEffect } from "react";
import PropTypes from "prop-types";
//import Pacientes from "./../../pacientes/Pacientes";
import { Label, TextInput, Button } from "flowbite-react";

import PacienteData from "./PacienteData";

import moment from "moment-timezone";
import { toast } from "sonner";
import { Modal, Card } from "flowbite-react";
import FormularioModal from "./FormularioModal";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useApi } from "../../../../Api/api";
import useSWR from "swr";


const ModalTelemedicina = ({ cargarDatos, visible, turno, onClose }) => {
	const [dni, setDni] = useState("16082567");
	const [dataTurno, setDataTurno] = useState(turno);
	const [dataPaciente, setDataPaciente] = useState(null);
	const { isLoading: cargandoPaciente } = useSWR(turno.idPaciente ? `pacientes/id/${turno.idPaciente}` : null, {
		onSuccess: (data) => {
			if(data.ok && (data.data.length > 0)) {
				setDataPaciente(data.data[0]);
			}
		}
	});

	const [estadoTurno, setEstadoTurno] = useState("");
	
	const { apiGet, apiPost, apiPatch, apiDelete } = useApi();

	useEffect(() => {
		if(!turno.idPaciente) {
			setDataPaciente(null);
		}
		setDataTurno(turno);
		setEstadoTurno(turno.estado);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [turno]);

	const buscarPaciente = async () => {
		let response = await apiGet(`pacientes/dni/${dni}`);
		if(response.ok && (response.data.length > 0)) {
			setDataPaciente(response.data[0]);
		} else {
			alert(`No se encontró DNI ${dni}, desea dar de alta los datos del paciente?`);
		}
	};

	const handleSubmit = async () => {
		//e.preventDefault();

		if(!dataPaciente) {
			toast.error("Por favor selecciona un paciente para continuar.");
			return;
		}

		if(!dataTurno.fechaHoraTurno || !dataTurno.fechaHoraFinTurno || !dataTurno.color || !dataTurno.descripcion) {
			toast.error("Por favor completa todos los campos.");
			return;
		}

		const datosTurno = ({
			...dataTurno,
			idPaciente: dataPaciente.id,
			idObraSocial: dataPaciente.idobrasocial,
			paciente: dataPaciente
		});

		try {
			let resp = await apiPost("turnos", datosTurno);
			if(resp.ok) {
				toast.success("Turno generado con éxito.");
				cargarDatos();
				onClose(false);
				return;
			}
			if(resp.errores.length > 0) {
				resp.errores.forEach(element => {
					toast.error(element);
				});
			} else {
				toast.error(resp.msg);
			}
		} catch(error) {
			toast.error(error.message); // Mostrar toast de error
		}
	};

	const handleDelete = async () => {
		try {
			// Realizar la solicitud de eliminación al backend
			await apiDelete(`turnos/${dataTurno.id}/eliminar`);
			cargarDatos();
			onClose(false);
		} catch(error) {
			toast.error(`Error al eliminar el turno en el backend [${error.message}]`);
		}
	};

	const handleUpdate = async () => {
		// Excluir el turno que se está actualizando de la lista de turnos
		//const otherTurns = turnos.filter((existingTurn) => existingTurn.id !== dataTurno.id);

		// Verificar superposición de turnos excluyendo el turno que se está actualizando
		//const overlappingTurn = otherTurns.find((existingTurn) =>
		//	(dataTurno.start >= existingTurn.start && dataTurno.start < existingTurn.end) ||
		//	(dataTurno.end > existingTurn.start && dataTurno.end <= existingTurn.end) ||
		//	(existingTurn.start >= dataTurno.start && existingTurn.start < dataTurno.end) ||
		//	(existingTurn.end > dataTurno.start && existingTurn.end <= dataTurno.end)
		//);

		//if(overlappingTurn) {
		//	toast.error("El nuevo turno se superpone con otro turno existente.");
		//	return;
		//}

		try {
			await apiPatch(`turnos/${dataTurno.id}/editar`, {
				fechaHoraTurno: dataTurno.start.toISOString(),
				fechaHoraFinTurno: dataTurno.end.toISOString(),
				descripcion: dataTurno.description,
				color: dataTurno.color
			});
			toast.success("Turno editado con éxito."); // Mostrar toast de éxito
			cargarDatos();
			onClose(false);
		} catch(error) {
			toast.error("Error al editar el turno. Por favor, inténtalo de nuevo.");
		}
	};

	if(cargandoPaciente) return <div>Loading...</div>;

	return(
		<Modal show={visible} onClose={() => onClose(false)}>
			<Modal.Header>Turno</Modal.Header>
			<Modal.Body>
				<Card className="mb-4">
					{
						turno.idTurno ?
						<div className="">
							<div>
								{
									dataPaciente ?
									<>
										<div className="flex gap-2 items-center mb-2">
											<HiOutlineUserCircle className="w-12 h-12 stroke-gray-300" />
											<p className="text-2xl font-semibold">{dataPaciente.nombre} {dataPaciente.apellido}</p>
										</div>
										<hr />
										<br></br>
										<div>
											<div className="flex items-center gap-2 mb-[1px]">
												<div className="max-w-28 w-full bold text-end bg-gray-800 text-white pr-4 text-sm">DNI</div>
												<div className="bold">{dataPaciente.dni}</div>
											</div>
											<div className="flex items-center gap-2 mb-[1px]">
												<div className="max-w-28 w-full bold text-end bg-gray-800 text-white pr-4 text-sm">Teléfono</div>
												<div className="bold">{dataPaciente.telefono}</div>
											</div>
											<div className="flex items-center gap-2 mb-[1px]">
												<div className="max-w-28 w-full bold text-end bg-gray-800 text-white pr-4 text-sm">Email</div>
												<div className="bold">{dataPaciente.email}</div>
											</div>
											<div className="flex items-center gap-2 mb-[1px]">
												<div className="max-w-28 w-full bold text-end bg-gray-800 text-white pr-4 text-sm">Estado</div>
												<div className="bold">{estadoTurno}</div>
											</div>
										</div>
									</>
									:
									<p className="p-2 bg-red-400 rounded font-semibold">Error en la base de dato.</p>
								}
							</div>
						</div>
						:
						<>
							<div className="flex item-center gap-2">
								<div className="flex items-center gap-2">
									<div>
										<div className="mb-2 block">
											<Label htmlFor="dni" value="DNI Paciente" />
										</div>
										<TextInput id="dni" name="dni" value={dni} onChange={e => setDni(e.target.value)} />
									</div>
									<div className="mt-8">
										<Button onClick={buscarPaciente}>Buscar</Button>
									</div>
								</div>
							</div>
							{
								dataPaciente ?
								<PacienteData data={dataPaciente} onChangeData={setDataPaciente} />
								:
								null
							}
						</>
					}
				</Card>
				<p className="text-center text-l text-gray-600 mb-4"><strong style={{ fontWeight: "bold" }}>Fecha seleccionada:</strong>{" "}{moment(dataTurno.start).format("LLLL")}</p>
				<FormularioModal
					handleSubmit={handleSubmit}
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					dataTurno={dataTurno}
					setDataTurno={setDataTurno}
					turno={turno}
				/>
			</Modal.Body>
		</Modal>
	);
};

ModalTelemedicina.propTypes = {
  cargarDatos: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  turno: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ModalTelemedicina;

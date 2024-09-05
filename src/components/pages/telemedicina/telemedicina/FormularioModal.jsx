import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { genDateTime } from "./utils";
import { HiCheck, HiOutlineTrash, HiPencil } from "react-icons/hi";
import { FaWhatsapp, FaVideo } from "react-icons/fa";
import ConfirmationDialog from "../../../ui/ConfirmationDialog";
import recodatorio from "./recordatorio";
import { Card, Button, Label, TextInput, Textarea } from "flowbite-react";

const FormularioModal = ({ handleSubmit, handleDelete, handleUpdate, dataTurno, setDataTurno }) => {	
	const navigate = useNavigate();
	const [processing, setProcessing] = useState(false);
	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

	const irALlamada = () => {
		// Crear una variable en el almacenamiento local
		localStorage.setItem("link_llamada", dataTurno.link_host);
		// Cambiar la ruta a /dashboard/llamada
		navigate("/dashboard/llamada");
	};

	const handleChange = (event) => {
		let field = event.target.name;
		let value = event.target.value;
		if(field === "fechaHoraTurno" || field === "fechaHoraFinTurno") {
			value = genDateTime(dataTurno.fechaHoraFinTurno, value); //?? Qué hace esto???
		}
		setDataTurno({ ...dataTurno, [field]: value });
	};

	const handleSubmitProc = async () => {
		setProcessing(true);
	};

	useEffect(() => {
		if(processing) {
			handleSubmit().then(() => setProcessing(false));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [processing]);

	return(
		<div className="mb-4">
			<Card>
				<div className="grid grid-cols-[150px_150px_150px] gap-2">
					<div className="grow">
						<Label htmlFor="fechaHoraTurno" value="Hora de inicio" />
						<TextInput id="fechaHoraTurno" name="fechaHoraTurno" type="time" min="07:00" max="21:00" value={moment(dataTurno.fechaHoraTurno).format("HH:mm")} onChange={handleChange} required />
					</div>
					<div className="grow">
						<Label htmlFor="fechaHoraFinTurno" value="Hora de finalización" />
						<TextInput id="fechaHoraFinTurno" name="fechaHoraFinTurno" type="time" min="07:00" max="21:00" value={moment(dataTurno.fechaHoraFinTurno).format("HH:mm")} onChange={handleChange} required />
					</div>
					<div className="grow">
						<Label htmlFor="color" value="Color del evento" />
						<TextInput style={{ padding: "4px", height: "3em", border: "1px solid #6B7280" }} id="color" name="color" type="color" value={dataTurno.color} onChange={handleChange} />
					</div>
				</div>
				<div>
					<Label htmlFor="descripcion" value="Descripción del turno" />
					<Textarea id="descripcion" name="descripcion" value={dataTurno.descripcion} rows={4} onChange={handleChange} />
				</div>

				<div className="">
					<br></br>
					{
						dataTurno.idTurno ?
						<div className="flex flex-col">
							{
								dataTurno.link_host && <button className="flex items-center justify-center w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2" onClick={irALlamada}><FaVideo className="h-5 w-5 mr-2" /> Iniciar Consulta</button>
							}
							<button onClick={() => recodatorio(dataTurno)} className="flex items-center justify-center w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mb-2"><FaWhatsapp className="h-5 w-5 mr-2" />Enviar Recordatorio</button>
							<br></br>
							<div className="flex">
								<button onClick={() => setShowConfirmationDialog(true)} className="flex items-center justify-center w-1/2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mr-1"><HiOutlineTrash className="h-5 w-5 mr-2" />Eliminar Turno</button>
								<button onClick={handleUpdate} className="flex items-center justify-center w-1/2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-1"><HiPencil className="h-5 w-5 mr-2" />Editar Turno</button>
							</div>
						</div>
						:
						<div className="flex justify-end">
							<Button onClick={handleSubmitProc} disabled={processing}><HiCheck className="h-5 w-5 mr-2" />Generar Nuevo Turno</Button>
						</div>
					}
				</div>
				{
					showConfirmationDialog && <ConfirmationDialog message="¿Estás seguro de que deseas eliminar este turno?" onConfirm={handleDelete} onCancel={() => setShowConfirmationDialog(false)} />
				}
			</Card>
		</div>
	);
};

FormularioModal.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleUpdate: PropTypes.func.isRequired,
	dataTurno: PropTypes.object.isRequired,
	setDataTurno: PropTypes.func.isRequired
};
  

export default FormularioModal;

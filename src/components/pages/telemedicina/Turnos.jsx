import { useState } from "react";
import useSWR from "swr";
import moment from "moment";
import RenderCalendario from "./telemedicina/RenderCalendario";
import ModalTelemedicina from "./telemedicina/ModalTelemedicina";
import Spinner from "../../ui/Spinner";

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const Turnos = () => {
	const { error, isLoading, mutate } = useSWR("turnos", {
		onSuccess: (data) => {
			if(data.ok && data.data) {
				if(data.data.length > 0) {
					const transformacion = data.data.map((turno) => {
						return {
							title: turno.p_fullname,
							start: moment(turno.fechaHoraTurno).toDate(),
							end: moment(turno.fechaHoraFinTurno).toDate(),
							resource: turno,
							color: turno.color
						};
					});
					setDataTurnos(transformacion);
				} else {
					setDataTurnos([]);
				}
			}
		}
	});

	const [dataTurnos, setDataTurnos] = useState([]);
	const [selectedTurno, setSelectedTurno] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const handleSelectEvent = (event) => {
		setSelectedTurno(event.resource);
		setModalVisible(true);
	};

	const onSelectNewRange = (desde, hasta) => {
		setSelectedTurno({
			idTurno: null,
			idPaciente: null,
			descripcion: "",
			fechaHoraTurno: desde,
			fechaHoraFinTurno: hasta,
			idObraSocial: null,
			color: getRandomColor(),
			paciente: null
		});
		setModalVisible(true);
	};

	if (error) return <div>failed to load</div>
	if (isLoading) return <Spinner />

	return (
		<div className="Turnos">
			<h1 className="text-gray-400 uppercase font-bold text-xs">Turnos</h1>
			<br></br>
			<RenderCalendario
				onSelectNewRange={onSelectNewRange}
				handleSelectEvent={handleSelectEvent}
				data={dataTurnos}
			/>
			{
				selectedTurno ?
					<ModalTelemedicina
						cargarDatos={mutate}
						visible={modalVisible}
						turno={selectedTurno}
						onClose={setModalVisible}
					/>
					:
					null
			}
		</div>
	);
};

export default Turnos;
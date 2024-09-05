import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
const localizer = momentLocalizer(moment);
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes from "prop-types";

//Estilos de los eventos
const eventStyleGetter = (event) => ({
	style: {
		backgroundColor: event.color || "#3B82F6",
		borderRadius: "0px",
		opacity: 0.8,
		color: "#fff",
		border: "none",
		display: "block",
		textAlign: "center",
		fontSize: "14px",
		lineHeight: "1.5"
	},
});

// Función para obtener las propiedades del día
const dayPropGetter = (date) => {
	const today = new Date(); // variabble creada para pintar el dia de hoy.
	// Especificar el tipo de 'date' como 'Date'
	const isToday =
	date.getDate() === today.getDate() &&
	date.getMonth() === today.getMonth() &&
	date.getFullYear() === today.getFullYear();
	if(isToday) {
		return {
			className: "today", // Clase CSS para el día de hoy
			style: {
				backgroundColor: "#C8DAE7", // Color de fondo para el día de hoy
				color: "white", // Color de texto para el día de hoy
			}
		};
	}
	return {};
};

const RenderCalendario = ({ data, handleSelectEvent, onSelectNewRange }) => {
	return (
		<Calendar
			localizer={localizer}
			events={data}
			startAccessor="start"
			endAccessor="end"
			selectable
			style={{ height: 600 }}
			eventPropGetter={eventStyleGetter}
			dayPropGetter={dayPropGetter} // Utilizar la función dayPropGetter
			onSelectEvent={handleSelectEvent}
			onSelectSlot={(slotInfo) => {
				onSelectNewRange(slotInfo.start, slotInfo.end);
			}}
			/*{
			setSelectedDate(slotInfo.start);
			const selectedStartDate = slotInfo.start;
			// Verificar si la fecha seleccionada es igual o posterior a hoy
			if (selectedStartDate >= todayMidnight) {
			setSelectedDate(selectedStartDate);
			setStartTime(moment(selectedStartDate).format("HH:mm"));
			setEndTime(moment(slotInfo.end).format("HH:mm"));
			setSelectedEvent(null); // Restablecer selectedEvent al seleccionar un nuevo slot
			setShowModal(true);
			} else {
			// toast.error("No se pueden seleccionar fechas anteriores a hoy.");
			}
			}}*/
			min={new Date(new Date().setHours(7, 0, 0, 0))} // Horario mínimo (7:00 am)
			max={new Date(new Date().setHours(21, 0, 0, 0))} // Horario máximo (9:00 pm)
			messages={{
				today: "Hoy",
				previous: "Anterior",
				next: "Siguiente",
				month: "Mes",
				week: "Semana",
				day: "Día",
				agenda: "Agenda",
				date: "Fecha",
				time: "Hora",
				event: "Evento",
				showMore: (total) => `+ Mostrar más (${total})`
			}}
		/>
	);
};

RenderCalendario.propTypes = {
	data: PropTypes.array.isRequired,
	handleSelectEvent: PropTypes.func.isRequired,
	onSelectNewRange: PropTypes.func.isRequired
};

export default RenderCalendario;

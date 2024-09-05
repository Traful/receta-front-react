export const formatFecha = (fecha) => {
	let value = fecha.substring(0, 10);
	value = value.split("-").reverse().join("/");
	return value;
};

export const obtenerNombreDiaActual = () => {
	let fechaActual = new Date();
	let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
	let numeroDiaSemana = fechaActual.getDay();
	let nombreDiaSemana = diasSemana[numeroDiaSemana];
	return nombreDiaSemana;
};
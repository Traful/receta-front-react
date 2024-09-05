export const genDateTime = (fecha, valor) => {
	let timeString = valor;
	let timeParts = timeString.split(":");
	let hours = parseInt(timeParts[0]);
	let minutes = parseInt(timeParts[1]);
	// Crear un objeto de fecha con una fecha arbitraria (aquí estamos usando la fecha actual)
	let date = fecha;
	date.setHours(hours);
	date.setMinutes(minutes);
	return date;
};
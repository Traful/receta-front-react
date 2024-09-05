import moment from "moment-timezone";

const recordatorio = (turno) => {
	const { paciente_nombre: nombre, paciente_apellido: apellido, paciente_telefono: telefono } = turno.paciente;

	// Construye el mensaje del recordatorio
	const nombreCompleto = `${nombre} ${apellido}`;
	const fechaHoraFormateada = moment(turno?.start).format("dddd D [de] MMMM, [a las] LT [hs.] ");
	const emojiSaludo = "\uD83D\uDC4B\u{1F3FC}"; // Emoji de saludo (👋🏼) en formato de escape
	const mensaje = `${emojiSaludo} Hola ${nombreCompleto}
	📣 Te recordamos que tienes un turno para Telemedicina
	🩺 Con el Doctor/a: Federico
	📆 Fecha y hora del turno: ${fechaHoraFormateada}
	🤳 No olvides estar atento/a al celular, en un lugar con buena conectividad y luminosidad para una mejor atención.`;
	const mensajeCodificado = encodeURIComponent(mensaje.trim()); // Eliminar espacios al principio y al final
	// Construye el enlace de WhatsApp con el mensaje y el número de teléfono del paciente
	const telefonoPaciente = telefono;
	const enlaceWhatsApp = `https://api.whatsapp.com/send/?phone=${telefonoPaciente}&text=${mensajeCodificado}`;
	// Abre el enlace en una nueva ventana
	window.open(enlaceWhatsApp, "_blank");
};

export default recordatorio;

export const defaultPacienteData = {
	id: 0,
	dni: "",
	apellido: "",
	nombre: "",
	sexo: "M",
	talla: "",
	peso: "",
	email: "",
	paistelef: null,
	telefono: "",
	idobrasocial: 156,
	nromatriculadoc: "",
	tipoplan: 3,
	fecnac: new Date().toISOString().split('T')[0]
};

export const defaultDataReceta = {
	idpaciente: 0,
	talla: "",
	peso: "",
	email: "",
	telefono: "",
	idespecialidad: 99999,
	idobrasocial: 156,
	idlugaratencion: 1,
	nromatriculadoc: "",
	tipoplan: 3,
	timetratamiento: 1,
	motexcepcion: "",
	diagnostico: "",
	identreservada: false,
	tolerancia: "",
	medicamentos: [],
	paciente: defaultPacienteData
};

export const defaultDataEstudio = {
	idpaciente: 0,
	talla: "",
	peso: "",
	email: "",
	telefono: "",
	idespecialidad: 99999,
	idobrasocial: 156,
	nromatriculadoc: "",
	tipoplan: 3,
	motexcepcion: "",
	diagnostico: "",
	identreservada: false,
	estudios: [],
	paciente: defaultPacienteData
}
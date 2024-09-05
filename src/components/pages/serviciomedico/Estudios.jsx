import { useState, useContext } from "react";
import Contexto from "../../../store/Contexto";
import { useApi } from "../../../Api/api";
import { defaultDataEstudio } from "../../../utils/constantes";
import { Label, TextInput, Textarea, Checkbox, Button } from "flowbite-react";
import Especialidades from "./utilssm/Especialidades";
import PacienteData from "./utilssm/PacienteData";
import EstudiosData from "./utilssm/EstudiosData";
import { toast } from "sonner";
import { obtenerNombreDiaActual } from "../../../utils/formats";

const Estudios = () => {
	const context = useContext(Contexto);
	const { apiGet, apiPost } = useApi();

	const [estudio, setEstudio] = useState(defaultDataEstudio);

	const [dni, setDni] = useState("16082567");
	
	const buscarPaciente = async () => {
		let response = await apiGet(`pacientes/dni/${dni}`);
		if(response.data && (response.data.length > 0)) {
			setEstudio({
				...defaultDataEstudio,
				//data paciente en receta
				idpaciente: response.data[0].id,
				talla: response.data[0].talla,
				peso: response.data[0].peso,
				email: response.data[0].email,
				telefono: response.data[0].telefono,
				idobrasocial: (context.state.user.muni.esmunicipal && context.state.user.muni.puedehoy) ? 156 : response.data[0].idobrasocial,
				nromatriculadoc: (context.state.user.muni.esmunicipal && context.state.user.muni.puedehoy && (parseInt(response.data[0].idobrasocial, 10) === 156)) ? response.data[0].nromatriculadoc : "",
				tipoplan: response.data[0].tipoplan, //Falta acomodar en base a si es Muni!!!
				//fin data paciente en receta
				paciente: response.data[0]
			});
		} else {
			setEstudio(defaultDataEstudio);
			alert(`El DNI ${dni} no existe, desea cargar un nuevo paciente? [Si/No]`);
		}
	};

	const handleDatapacienteChange = (values) => {
		let newData = {
			...estudio,
			talla: values.talla,
			peso: values.peso,
			email: values.email,
			telefono: values.telefono,
			idobrasocial: values.idobrasocial,
			nromatriculadoc: values.nromatriculadoc,
			tipoplan: values.tipoplan
		};
		if(parseInt(values.idobrasocial, 10) !== parseInt(estudio.idobrasocial)) {
			if(parseInt(values.idobrasocial, 10) === parseInt(estudio.paciente.idobrasocial)) {
				newData.tipoplan = estudio.paciente.tipoplan;
				newData.nromatriculadoc = estudio.paciente.nromatriculadoc;
			} else {
				newData.tipoplan = 3;
				newData.nromatriculadoc = "";
			}
			newData.motexcepcion = "";
			newData.tolerancia = "";
			newData.estudios = [];
		}
		setEstudio(newData);
	};

	const generarEstudio = async () => {
		let data = { ...estudio };
		delete data.paciente;
		try {
			let response = await apiPost("pacientes/estudios", data);
			if(response.errores.length > 0) {
				response.errores.map(e => toast.error(e));
			}
		} catch(error) {
			console.log("???", error);
		}
	};

	let puedePrescribir = {
		ok: true,
		leyenda: ""
	}

	if(parseInt(estudio.idobrasocial, 10) === 156) {
		if(!context.state.user.muni.esmunicipal) {
			puedePrescribir.ok = false;
			puedePrescribir.leyenda = `Estimado Dr/Dra ${context.state.user.apellido} UD no está autorizado a prescribir estudios en la obra social seleccionada.`;
		}
		if(!context.state.user.muni.puedehoy) {
			puedePrescribir.ok = false;
			puedePrescribir.leyenda = `Estimado Dr/Dra ${context.state.user.apellido} UD no está autorizado a prescribir estudios en la obra social seleccionada los días ${obtenerNombreDiaActual()}.`;
		}
	}

	return (
		<div className="Estudios">
			<h1 className="text-3xl">Estudios complementarios</h1>
			<div className="flex item-center gap-2 mt-4">
				<div>
					<Especialidades onEspecialidadChange={(val) => setEstudio({ ...estudio, idespecialidad: val })}/>
				</div>
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
				parseInt(estudio.paciente.id) !== 0 ?
				<>
					<PacienteData data={estudio} onChangeData={handleDatapacienteChange} />
					{
						puedePrescribir.ok ?
						<>
							{
								((parseInt(estudio.idobrasocial, 10) === 156) && (parseInt(estudio.tipoplan, 10) === 2)) ?
								<div>
									<div className="mb-2 block mt-2">
										<Label htmlFor="motexcepcion" value="Motivo Excepción" />
									</div>
									<Textarea id="motexcepcion" name="motexcepcion" rows={4} value={estudio.motexcepcion} onChange={e => setEstudio({ ...estudio, motexcepcion: e.target.value })} />
								</div>
								:
								null
							}
							<div className="mt-4">
								<div>
									<div className="mb-2 block">
										<Label htmlFor="diagnostico" value="Diagnostico" />
										<div className="flex items-center gap-2">
											<Checkbox id="accept" checked={estudio.identreservada} onChange={() => setEstudio({ ...estudio, identreservada: !estudio.identreservada})} />
											<Label htmlFor="accept" className="flex">Con Identidad Reservada. B24, Ley 23798, Decreto Reglamentario 1244/91</Label>
										</div>
									</div>
									<Textarea id="diagnostico" name="diagnostico" rows={4} value={estudio.diagnostico} onChange={e => setEstudio({ ...estudio, diagnostico: e.target.value })} />
								</div>
							</div>
							<div className="mt-4">
								<EstudiosData estudios={estudio.estudios} onEstudiosChange={(value) => setEstudio({ ...estudio, estudios: value })} />
							</div>
							{
								estudio.estudios.length > 0 ?
								<Button className="mt-4 w-full" onClick={generarEstudio}>Generar Estudio/s</Button>
								:
								null
							}
						</>
						:
						<div className="w-full p-2 bg-red-300 rounded-md">{puedePrescribir.leyenda}</div>
					}
				</>
				:
				null
			}
		</div>
	);
};

export default Estudios;
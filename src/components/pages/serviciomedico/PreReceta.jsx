import { useState, useContext } from "react";
import Contexto from "../../../store/Contexto";
import { useApi } from "../../../Api/api";
import { defaultDataReceta } from "../../../utils/constantes";
import { Label, TextInput, Textarea, Checkbox, Button, Select } from "flowbite-react";
import Especialidades from "./utilssm/Especialidades";
import PacienteData from "./utilssm/PacienteData";
import TratamientosTime from "./utilssm/TratamientosTime";
import Vademecum from "./utilssm/Vademecum";
import Medicamentos from "./utilssm/Medicamentos";
import useSWR from "swr";
import { toast } from "sonner";
import { obtenerNombreDiaActual } from "../../../utils/formats";

const PreReceta = () => {
	const context = useContext(Contexto);
	const { apiGet, apiPost } = useApi();
	const [receta, setReceta] = useState(defaultDataReceta);
	const [dni, setDni] = useState("16082567");
	const { data: lugaresatencion } = useSWR("obrassociales/lugares/atencion");
	
	const buscarPaciente = async () => {
		let response = await apiGet(`pacientes/dni/${dni}`);
		if(response.data && (response.data.length > 0)) {
			setReceta({
				...defaultDataReceta,
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
			setReceta(defaultDataReceta);
			alert(`El DNI ${dni} no existe, desea cargar un nuevo paciente? [Si/No]`);
		}
	};

	const handleDatapacienteChange = (values) => {
		let newData = {
			...receta,
			talla: values.talla,
			peso: values.peso,
			email: values.email,
			telefono: values.telefono,
			idobrasocial: values.idobrasocial,
			nromatriculadoc: values.nromatriculadoc,
			tipoplan: values.tipoplan
		};
		if(parseInt(values.idobrasocial, 10) !== parseInt(receta.idobrasocial)) {
			if(parseInt(values.idobrasocial, 10) === parseInt(receta.paciente.idobrasocial)) {
				newData.tipoplan = receta.paciente.tipoplan;
				newData.nromatriculadoc = receta.paciente.nromatriculadoc;
			} else {
				newData.tipoplan = 3;
				newData.nromatriculadoc = "";
			}
			newData.timetratamiento = 1;
			newData.motexcepcion = "";
			newData.tolerancia = "";
			newData.medicamentos = [];
		}
		setReceta(newData);
	};

	const handleTratamientoTimeSelected = (value) => {
		setReceta({ ...receta, timetratamiento: value });
	};

	const handleMedicamentoAdd = (obj) => {
		let existe = receta.medicamentos.filter(m => m.id === obj.id);
		if(existe.length === 0) {
			let buffer = [...receta.medicamentos];
			buffer.push(obj);
			setReceta({ ...receta, medicamentos: buffer });
		}
	};

	const handleMedicamentosChange = (arrayObj) => {
		setReceta({ ...receta, medicamentos: arrayObj });
	};

	const generarReceta = async () => {
		let data = { ...receta };
		delete data.paciente;
		try {
			let response = await apiPost("pacientes/recetas", data);
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

	if(parseInt(receta.idobrasocial, 10) === 156) {
		if(!context.state.user.muni.esmunicipal) {
			puedePrescribir.ok = false;
			puedePrescribir.leyenda = `Estimado Dr/Dra ${context.state.user.apellido} UD no está autorizado a prescribir recetas en la obra social seleccionada.`;
		}
		if(!context.state.user.muni.puedehoy) {
			puedePrescribir.ok = false;
			puedePrescribir.leyenda = `Estimado Dr/Dra ${context.state.user.apellido} UD no está autorizado a prescribir recetas en la obra social seleccionada los días ${obtenerNombreDiaActual()}.`;
		}
	}

	return (
		<div className="PreReceta">
			<h1 className="text-3xl">Prescribir Receta</h1>
			<div className="flex item-center gap-2 mt-4">
				<div>
					<Especialidades onEspecialidadChange={(val) => setReceta({ ...receta, idespecialidad: val })}/>
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
				parseInt(receta.paciente.id) !== 0 ?
				<>
					<PacienteData data={receta} onChangeData={handleDatapacienteChange} />
					{
						puedePrescribir.ok ?
						<>
							{
								((parseInt(receta.idobrasocial, 10) === 156) && (parseInt(receta.tipoplan, 10) === 2)) ?
								<div>
									<div className="mb-2 block mt-2">
										<Label htmlFor="motexcepcion" value="Motivo Excepción" />
									</div>
									<Textarea id="motexcepcion" name="motexcepcion" rows={4} value={receta.motexcepcion} onChange={e => setReceta({ ...receta, motexcepcion: e.target.value })} />
								</div>
								:
								null
							}
							{
								(parseInt(receta.idobrasocial, 10) === 156) && (lugaresatencion.data.length > 0) ?
								<>
									<div className="mb-2 block mt-2">
										<Label htmlFor="idlugaratencion" value="Lugar de atención" />
									</div>
									<Select name="idlugaratencion" id="idlugaratencion" value={receta.idlugaratencion} onChange={e => setReceta({...receta, idlugaratencion: parseInt(e.target.value, 10)})}>
										{
											lugaresatencion.data.map(la => <option key={`id-${la.idctro}`} value={parseInt(la.idctro, 10)}>{la.centrosalud}</option>)
										}
									</Select>
								</>
								:
								null
							}
							<TratamientosTime idObraSocial={parseInt(receta.idobrasocial, 10)} defaultTime={parseInt(receta.timetratamiento)} onChangeSelected={handleTratamientoTimeSelected} />
							<div>
								<div>
									<div className="mb-2 block">
										<Label htmlFor="diagnostico" value="Diagnostico" />
										<div className="flex items-center gap-2">
											<Checkbox id="accept" checked={receta.identreservada} onChange={() => setReceta({ ...receta, identreservada: !receta.identreservada})} />
											<Label htmlFor="accept" className="flex">Con Identidad Reservada. B24, Ley 23798, Decreto Reglamentario 1244/91</Label>
										</div>
									</div>
									<Textarea id="diagnostico" name="diagnostico" rows={4} value={receta.diagnostico} onChange={e => setReceta({ ...receta, diagnostico: e.target.value })} />
								</div>
								{
									parseInt(receta.idobrasocial, 10) === 20 ?
									<div>
										<div className="mb-2 block">
											<Label htmlFor="tolerancia" value="Respuesta y tolerancia al tratamiento" />
										</div>
										<Textarea id="tolerancia" name="tolerancia" rows={4} value={receta.tolerancia} onChange={e => setReceta({ ...receta, tolerancia: e.target.value })} />
									</div>
									:
									null
								}
								
							</div>
							<Vademecum idObraSocial={parseInt(receta.idobrasocial)} timeTratamiento={parseInt(receta.timetratamiento)} onMedicamentoAdd={handleMedicamentoAdd} />
							<Medicamentos medicamentos={receta.medicamentos} onMedicamentosChange={handleMedicamentosChange} />
							{
								receta.medicamentos.length > 0 ?
								<Button className="mt-4 w-full" onClick={generarReceta}>Generar Receta</Button>
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

export default PreReceta;
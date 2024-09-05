import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table, TextInput, Button } from "flowbite-react";
import { BsFillTrash2Fill } from "react-icons/bs";

const Medicamentos = ({ medicamentos, onMedicamentosChange }) => {
	const [meds, setMeds] = useState(medicamentos);

	useEffect(() => {
		setMeds(medicamentos);
	}, [medicamentos]);

	const quitar = (i) => {
		let buffer = [...meds];
		buffer.splice(i, 1);
		setMeds(buffer);
		if(onMedicamentosChange && (typeof onMedicamentosChange === "function")) onMedicamentosChange(buffer);
	};

	const handleDosisChange = (valor, index) => {
		let buffer = [...meds];
		try {
			let v = parseInt(valor, 10);
			if(isNaN(v)) v = 1;
			if(v < 1) v = 1;
			buffer[index].dosis = v;
		} catch (error) {
			buffer[index].dosis = 1;
		}
		setMeds(buffer);
		if(onMedicamentosChange && (typeof onMedicamentosChange === "function")) onMedicamentosChange(buffer);
	};

	const handleCantidadChange = (valor, index, max = 0) => {
		let buffer = [...meds];
		try {
			let v = parseInt(valor, 10);
			if(isNaN(v)) v = 1;
			if(v < 1) v = 1;
			if(max > 0) {
				if(v <= max) {
					buffer[index].cantidad = v;
				} else {
					buffer[index].cantidad = max;
				}
			} else {
				buffer[index].cantidad = v;
			}
		} catch (error) {
			buffer[index].dosis = 1;
		}
		setMeds(buffer);
		if(onMedicamentosChange && (typeof onMedicamentosChange === "function")) onMedicamentosChange(buffer);
	}

	return(
		<div className="Medicamentos mt-4 p-2 border border-gray-300 rounded">
			<h1 className="text-sm font-medium text-gray-900 dark:text-white">Medicamentos prescriptos</h1>
			<div className="overflow-x-auto">
				<Table hoverable>
					<Table.Head>
						<Table.HeadCell>Monodroga</Table.HeadCell>
						<Table.HeadCell>Sugerido</Table.HeadCell>
						<Table.HeadCell>Presentación</Table.HeadCell>
						<Table.HeadCell>Laboratorio</Table.HeadCell>
						<Table.HeadCell>Dósis diaria</Table.HeadCell>
						<Table.HeadCell>Cantidad</Table.HeadCell>
						<Table.HeadCell>Bono</Table.HeadCell>
						<Table.HeadCell><span className="sr-only">Opiones</span></Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{
							meds && (meds.length > 0) ?
							meds.map((d, index) => {
								return (
									<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`id-${d.id}`}>
										<Table.Cell>{d.monodroga.toUpperCase()}</Table.Cell>
										<Table.Cell>{d.nombre_comercial.toUpperCase()}</Table.Cell>
										<Table.Cell>{d.presentacion.toUpperCase()}</Table.Cell>
										<Table.Cell>{d.laboratorio.toUpperCase()}</Table.Cell>
										<Table.Cell><TextInput className="w-[80px]" type="number" value={d.dosis} onChange={(e) => handleDosisChange(e.target.value, index)} min={1} /></Table.Cell>
										<Table.Cell><div className="flex items-center gap-1"><TextInput className="w-[80px]" type="number" value={d.cantidad} onChange={(e) => handleCantidadChange(e.target.value, index, d.prescripmax ? d.prescripmax : 0)} min={1} /> {d.prescripmax ? <span className="text-sm text-gray-300">[{d.prescripmax}]</span> : ""}</div></Table.Cell>
										<Table.Cell>???</Table.Cell>
										<Table.Cell><Button color="failure" onClick={() => quitar(index)}><BsFillTrash2Fill className="w-4 h-4" /></Button></Table.Cell>
									</Table.Row>
								);
							})
							:
							<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell colSpan={8}>No se han seleccionado medicamentos.</Table.Cell>
							</Table.Row>
						}
					</Table.Body>
				</Table>
			</div>
		</div>
	);
};

Medicamentos.propTypes = {
	medicamentos: PropTypes.arrayOf(PropTypes.object),
	onMedicamentosChange: PropTypes.func
};


export default Medicamentos;
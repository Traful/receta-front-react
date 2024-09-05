import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table, Pagination, Label, Select, TextInput, Button, Spinner } from "flowbite-react";
import { MdOutlineManageSearch } from "react-icons/md";
import useSWR from "swr";

const url = (opciones) => {
	let url = `vademecum/obrasocial/${opciones.idobrasocial}/regs/${opciones.registros}/pagina/${opciones.pagina}`;
	if(opciones.texto.length > 0) url += `/buscar/${opciones.texto}`;
	return url;
};

const Vademecum = ({ idObraSocial, timeTratamiento, onMedicamentoAdd }) => {
	const [texto, setTexto] = useState("");
	const [opciones, setOpciones] = useState({
		idobrasocial: idObraSocial,
		timetratamiento: timeTratamiento,
		pagina: 1,
		registros: 5,
		texto: ""
	});
	const { data, isLoading } = useSWR(url(opciones));

	useEffect(() => {
		setOpciones({
			...opciones,
			idobrasocial: idObraSocial,
			timetratamiento: timeTratamiento
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idObraSocial, timeTratamiento]);

	const onPageChange = (page) => {
		setOpciones({ ...opciones, pagina:page });
	};

	const handleTxTSearchChange = () => {
		setOpciones({ ...opciones, texto: texto });
	};

	const addMedicamento = (obj) => {
		if(onMedicamentoAdd && (typeof onMedicamentoAdd === "function")) onMedicamentoAdd(obj);
	};

	if(isLoading) return <div className="my-4 flex justify-center items-center min-h-96"><Spinner size="xl" /></div>;

	return(
		<div className="Vademecum mt-4 p-2 border border-gray-300 rounded">
			<div className="w-full flex justify-between gap-2">
				<div className="flex items-center gap-2">
					<div className="max-w-[300px]">
						<div className="mb-2 block">
							<Label htmlFor="registros" value="Registros" />
						</div>
						<Select id="registros" name="registros" value={opciones.registros} onChange={e => setOpciones({ ...opciones, registros: e.target.value, pagina: 1 })}>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</Select>
					</div>
					<div className="max-w-[300px]">
						<div className="mb-2 block">
							<Label htmlFor="texto" value="Filtro" />
						</div>
						<TextInput id="texto" name="texto" value={texto} onChange={(e) => setTexto(e.target.value)} />
					</div>
					<Button type="button" className="mt-8 p-0" onClick={handleTxTSearchChange}><MdOutlineManageSearch className="w-6 h-6" /></Button>
				</div>
				<div>
					<div>
						<h3 className="mt-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">Referencias</h3>
						<div className="grid grid-cols-3 gap-2">
							<div className="p-2 rounded-md bg-green-300">Medicamentos Autorizados</div>
							<div className="p-2 rounded-md bg-yellow-200">Medicamentos con Auditoría</div>
							<div className="p-2 rounded-md bg-red-300">Medicamentos sin Cobertura</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="my-8" />
			<div className="overflow-x-auto">
				<Table hoverable>
					<Table.Head>
						<Table.HeadCell>Monodroga</Table.HeadCell>
						<Table.HeadCell>Sugerido</Table.HeadCell>
						<Table.HeadCell>Presentación</Table.HeadCell>
						<Table.HeadCell>Laboratorio</Table.HeadCell>
						<Table.HeadCell><span className="sr-only">Opiones</span></Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{
							data && (data.data.length > 0) ?
							data.data.map(d => {
								let color = "";
								let condicion = 0; //se respeta la condicion
								if((parseInt(opciones.idobrasocial, 10) === 20) && (parseInt(opciones.timetratamiento, 10) > 1)) {
									condicion = 1; //es mayor de 2 meses todos en color amarrillo
								}
								if(parseInt(d.tipo_venta, 10) === 4) {
									color = "#dcd9f8";
								} else {
									if(condicion === 0) {
										switch(parseInt(d.condicion, 10)) {
											case 1:
												color = "#84e1bc";
												break;
											case 2:
												color = "#fce96a";
												break;
											case 3:
												color = "#f8b4b4";
												break;
											default:
												break;
										}
									} else {
										switch(parseInt(d.condicion, 10)) {
											case 1:
												color = "#fce96a";
												break;
											case 2:
												color = "#fce96a";
												break;
											case 3:
												color = "#f8b4b4";
												break;
											default:
												break;
										}
									}
								}
								let componente = null;
								if((parseInt(d.tipo_venta, 10) === 4) && (parseInt(opciones.idobrasocial, 10) !== 20)) {
									componente = <div className="text-sm">Con boleta triplicado Ministerio de Salud</div>;
								} else if(parseInt(d.condicion, 10) === 3) {
									componente = <div className="text-sm text-red-400">Sin Cobertura</div>;
								} else {
									let obj = {
										...d,
										dosis: 1,
										cantidad: 1,
										idobrasocial: parseInt(opciones.idobrasocial, 10)
									};
									//if(parseInt(opciones.idobrasocial, 10) == 156) obj.prescripmax = d.prescripmax;
									componente = <Button onClick={() => addMedicamento(obj)}>Agregar</Button>;
								}

								return (
									<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black" style={{ backgroundColor: color }} key={`id-${d.id}`}>
										<Table.Cell>{d.monodroga.toUpperCase()}</Table.Cell>
										<Table.Cell>{d.nombre_comercial.toUpperCase()}</Table.Cell>
										<Table.Cell>{d.presentacion.toUpperCase()}</Table.Cell>
										<Table.Cell>{d.laboratorio.toUpperCase()}</Table.Cell>
										<Table.Cell>{componente}</Table.Cell>
									</Table.Row>
								);
							})
							:
							<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell colSpan={5}>No hay registros</Table.Cell>
							</Table.Row>
						}
					</Table.Body>
				</Table>
			</div>
			{
				data?.info ?
				<div className="flex justify-between items-center">
					<div>Total de {data.info.total_registros} registros. {data.info.filtro.length > 0 ? <strong>[{data.info.filtro}]</strong> : ""}</div>
					<div className="flex overflow-x-auto sm:justify-center">
						<Pagination previousLabel="Anterior" nextLabel="Siguiente" currentPage={data.info.pagina} totalPages={data.info.total_paginas} onPageChange={onPageChange} />
					</div>
				</div>
				:
				null
			}
		</div>
	);
};

Vademecum.propTypes = {
	idObraSocial: PropTypes.number,
	timeTratamiento: PropTypes.number,
	onMedicamentoAdd: PropTypes.func
};

export default Vademecum;
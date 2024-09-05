import { useState } from "react";
import Filtro from "./ui/Filtro";
import { useApi } from "./../../../Api/api";
import { formatFecha } from "./../../../utils/formats";
import { Table } from "flowbite-react";

const Recetas = () => {
	const [recetas, setRecetas] = useState([]);
	const { apiGet } = useApi();

	const handleFiltroChange = async (data) => {
		let { dni, fdesde, fhasta } = data;
		let url = "pacientes/recetas";
		if(dni) {
			url += `/dni/${dni}`;
			if(fdesde) url += `/${fdesde}/${fhasta}`;
		} else {
			if(fdesde) url += `/fecha/${fdesde}/${fhasta}`;
		}
		if(url === "pacientes/recetas") return;

		let dataResp = await apiGet(url);
		setRecetas(dataResp.data);
	};

	return(
		<div className="Recetas">
			<h1>Recetas</h1>
			<Filtro onChange={handleFiltroChange} />
			

			<div className="overflow-x-auto">
				<Table striped>
					<Table.Head>
						<Table.HeadCell>#</Table.HeadCell>
						<Table.HeadCell>Fecha</Table.HeadCell>
						<Table.HeadCell>Médico</Table.HeadCell>
						<Table.HeadCell>Diagnóstico</Table.HeadCell>
						<Table.HeadCell><span className="sr-only">Edit</span></Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{
						recetas.map((r) => 
							<Table.Row key={`r-${r.idreceta}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{r.idreceta}</Table.Cell>
								<Table.Cell>{formatFecha(r.fechaemision)}</Table.Cell>
								<Table.Cell>{`${r.apellido}, ${r.nombre}`}</Table.Cell>
								<Table.Cell>{r.diagnostico}</Table.Cell>
								<Table.Cell><a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Edit</a></Table.Cell>
							</Table.Row>
						)
					}
					
				</Table.Body>
			</Table>
			</div>

		</div>
	);
};

export default Recetas;
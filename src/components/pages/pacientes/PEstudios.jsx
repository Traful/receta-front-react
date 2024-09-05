import { useState } from "react";
import Filtro from "./ui/Filtro";
import { useApi } from "./../../../Api/api";
import { formatFecha } from "./../../../utils/formats";
import { Table } from "flowbite-react";

const PEstudios = () => {
	const [estudios, setEstudios] = useState([]);
	const { apiGet } = useApi();

	const handleFiltroChange = async (data) => {
		let { dni, fdesde, fhasta } = data;
		let url = "pacientes/estudios";
		if(dni) {
			url += `/dni/${dni}`;
			if(fdesde) url += `/${fdesde}/${fhasta}`;
		} else {
			if(fdesde) url += `/fecha/${fdesde}/${fhasta}`;
		}
		if(url === "pacientes/estudios") return;

		let dataResp = await apiGet(url);
		setEstudios(dataResp.data);
	};

	return(
		<div className="PEstudios">
			<h1>Estudios Médicos</h1>
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
						estudios && estudios.map((e) => 
							<Table.Row key={`e-${e.idestudio}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{e.idestudio}</Table.Cell>
								<Table.Cell>{formatFecha(e.fechaemision)}</Table.Cell>
								<Table.Cell>{e.medNom}</Table.Cell>
								<Table.Cell>{e.diagnostico}</Table.Cell>
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

export default PEstudios;
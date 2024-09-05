import { useState } from "react";
import Filtro from "./ui/Filtro";
import { useApi } from "./../../../Api/api";
import { formatFecha } from "./../../../utils/formats";
import { Table } from "flowbite-react";

const Certificados = () => {
	const [certificados, setCertificados] = useState([]);
	const { apiGet } = useApi();

	const handleFiltroChange = async (data) => {
		let { dni, fdesde, fhasta } = data;
		let url = "pacientes/certificados";
		if(dni) {
			url += `/dni/${dni}`;
			if(fdesde) url += `/${fdesde}/${fhasta}`;
		} else {
			if(fdesde) url += `/fecha/${fdesde}/${fhasta}`;
		}
		if(url === "pacientes/certificados") return;

		let dataResp = await apiGet(url);
		setCertificados(dataResp.data);
	};

	return(
		<div className="Certificados">
			<h1>Certificados Médicos</h1>
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
						certificados.map((c) => 
							<Table.Row key={`r-${c.idestudio}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{c.idestudio}</Table.Cell>
								<Table.Cell>{formatFecha(c.fechaemision)}</Table.Cell>
								<Table.Cell>{c.medNom}</Table.Cell>
								<Table.Cell>{c.diagnostico}</Table.Cell>
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

export default Certificados;
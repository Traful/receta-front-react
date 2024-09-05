import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useApi } from "../../../../Api/api";
import { Label, Select } from "flowbite-react";

const ObrasSociales = ({ defaultObraSocialId, onObraSocialChange }) => {
	const { apiGet } = useApi();
	const [obras, setObras] = useState([]);
	const [obraSelected, setObraSelected] = useState(0);
	
	useEffect(() => {
		const getData = async () => {
			let response = await apiGet("obrassociales");
			setObras(response.data);
		};
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setObraSelected(defaultObraSocialId || 142);
	}, [defaultObraSocialId]);

	useEffect(() => {
		const getData = async () => {
			let response = await apiGet("obrassociales");
			setObras(response.data);
			setObraSelected(defaultObraSocialId || 142);
		};
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultObraSocialId]);

	const handleObraSelectedChange = (event) => {
		setObraSelected(event.target.value);
		if(onObraSocialChange && (typeof onObraSocialChange === "function")) onObraSocialChange(event.target.value);
	};

	return(
		<div>
			<div className="mb-2 block">
				<Label htmlFor="obraSelected" value="Obra Social" />
			</div>
			<Select name="obraSelected" id="obraSelected" value={obraSelected} onChange={handleObraSelectedChange}>
				{
					obras.map(o => <option key={`o-${o.id}`} value={o.id}>{o.sigla.toUpperCase()}</option>)
				}
			</Select>
		</div>
	);
};

//obras.map(o => <option key={`o-${o.id}`} value={o.id}>{o.descripcion.toUpperCase()}</option>)

ObrasSociales.propTypes = {
	defaultObraSocialId: PropTypes.number,
	onObraSocialChange: PropTypes.func
};

export default ObrasSociales;
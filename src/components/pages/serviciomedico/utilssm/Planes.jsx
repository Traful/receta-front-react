import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useApi } from "../../../../Api/api";
import { Label, Select } from "flowbite-react";

const Planes = ({ idObraSocial, defaultSelected, onChangeSelected }) => {
	const [planes, setPlanes] = useState(null);
	const [planSelected, setPlanSelected] = useState(3);
	const { apiGet } = useApi();

	useEffect(() => {
		const getData = async (url) => {
			let data = await apiGet(url);
			setPlanes(data.data);
			if(defaultSelected) {
				let existeDef = data.data.filter(d => parseInt(d.id, 10) === parseInt(defaultSelected, 10));
				if(existeDef && (existeDef.length > 0)) setPlanSelected(parseInt(defaultSelected, 10));
			} else {
				setPlanSelected(parseInt(data.data[0].id, 10));
			}
		};
		if(idObraSocial) {
			let id = parseInt(idObraSocial, 10);
			getData(`planes/obrasocial/${id}`);
		} else {
			getData("planes");
		}
	}, [idObraSocial]);

	const handlePlanSelectedChange = (event) => {
		setPlanSelected(event.target.value);
		if(onChangeSelected && (typeof onChangeSelected === "function")) onChangeSelected(event.target.value);
	};

	if(!planes || (planes.length === 0)) return null;

	return(
		<div>
			<div className="mb-2 block">
				<Label htmlFor="planes" value="Plan" />
			</div>
			<Select name="planes" id="planes" value={planSelected} onChange={handlePlanSelectedChange} disabled>
				{
					planes.map(p => <option key={`o-${p.id}`} value={p.id}>{p.plan === "" ? "S/Descripción" : p.plan.toUpperCase()}</option>)
				}
			</Select>
		</div>
	);
};

Planes.propTypes = {
	idObraSocial: PropTypes.number,
	defaultSelected: PropTypes.number,
	onChangeSelected: PropTypes.func
};

export default Planes;
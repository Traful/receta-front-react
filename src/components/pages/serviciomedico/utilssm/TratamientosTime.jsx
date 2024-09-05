import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TratamientosTime = ({ idObraSocial, defaultTime, onChangeSelected }) => {
	const [tiempo, setTiempo] = useState(0);

	useEffect(() => {
		setTiempo(defaultTime);
	}, [defaultTime])

	const handleOptionChange = (event) => {
		setTiempo(event.target.value);
		if(onChangeSelected && (typeof onChangeSelected === "function")) onChangeSelected(event.target.value);
	};

	return(
		<div className="TratamientosTime my-4 border-2 border-gray-200 p-2 rounded-md">
			<h3 className="mb-4">Tratamientos</h3>
			<div className="grid grid-cols-3">
				{
					parseInt(idObraSocial, 10) === 20 ?
					<>
						<label><input type="radio" id="tiempo" name="tiempo" value={1} checked={parseInt(tiempo, 10) === 1} onChange={handleOptionChange} /> <span className="ml-2 text-sm">Actual</span></label>
						<label><input type="radio" id="tiempo" name="tiempo" value={2} checked={parseInt(tiempo, 10) === 2} onChange={handleOptionChange} /> <span className="ml-2 text-sm">2 meses</span></label>
						<label><input type="radio" id="tiempo" name="tiempo" value={3} checked={parseInt(tiempo, 10) === 3} onChange={handleOptionChange} /> <span className="ml-2 text-sm">3 meses</span></label>
						<label><input type="radio" id="tiempo" name="tiempo" value={4} checked={parseInt(tiempo, 10) === 4} onChange={handleOptionChange} /> <span className="ml-2 text-sm">4 meses</span></label>
						<label><input type="radio" id="tiempo" name="tiempo" value={5} checked={parseInt(tiempo, 10) === 5} onChange={handleOptionChange} /> <span className="ml-2 text-sm">5 meses</span></label>
						<label><input type="radio" id="tiempo" name="tiempo" value={6} checked={parseInt(tiempo, 10) === 6} onChange={handleOptionChange} /> <span className="ml-2 text-sm">6 meses</span></label>
					</>
					:
					<>
						<label><input type="radio" id="tiempo" name="tiempo" value={1} checked={parseInt(tiempo, 10) === 1} onChange={handleOptionChange} /> <span className="ml-2 text-sm">Actual (1 Receta)</span></label>
						<label><input type="radio" id="tiempo" name="tiempo" value={2} checked={parseInt(tiempo, 10) === 2} onChange={handleOptionChange} /> <span className="ml-2 text-sm">Prolongado 60 días (2 Recetas)</span></label>
						<label><input type="radio" id="tiempo" name="tiempo" value={3} checked={parseInt(tiempo, 10) === 3} onChange={handleOptionChange} /> <span className="ml-2 text-sm">Prolongado 90 días (3 Recetas)</span></label>
					</>
				}
			</div>
		</div>
	);
};

TratamientosTime.propTypes = {
	idObraSocial: PropTypes.number,
	defaultTime: PropTypes.number,
	onChangeSelected: PropTypes.func
};

export default TratamientosTime;
import { useState } from "react";
import PropTypes from "prop-types";
import { Label, TextInput, Button, Datepicker } from "flowbite-react";

const Filtro = ({ onChange }) => {
	const [dataSelected, setDataSelected] = useState({
		dni: "43449724", //Doña Sosa Pesoa, Sofia Sabrina que se hace atender por PESOA, CLAUDIA BEATRIZ y tiene una banda de certificados, que causlidad jajaja
		fdesde: new Date("1980-01-01").toISOString().split('T')[0],
		fhasta: new Date().toISOString().split('T')[0]
	});

	const handleSubmitForm = (event) => {
		event.preventDefault();
		onChange(dataSelected);
	};

	return(
		<div>
			<form className="mt-2" onSubmit={handleSubmitForm}>
				<div className="w-full flex gap-2">
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="dni" value="DNI" />
						</div>
						<TextInput id="dni" name="dni" type="dni" value={dataSelected.dni} onChange={(e) => setDataSelected({ ...dataSelected, dni: e.target.value })} />
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="fdesde" value="F. Desde" />
						</div>
						<Datepicker id="fdesde" name="fdesde" value={dataSelected.fdesde}
							weekStart={1}
							language="es-ES"
							datepicker-format="dd/mm/yyyy"
							labelTodayButton="Hoy"
							labelClearButton="Limpiar"
							onSelectedDateChanged={(date) => {
								setDataSelected({ ...dataSelected, "fdesde": new Date(date).toISOString().split('T')[0] })
							}}
						/>
					</div>
					<div className="grow">
						<div className="mb-2 block">
							<Label htmlFor="fhasta" value="F. Hasta" />
						</div>
						<Datepicker id="fhasta" name="fhasta" value={dataSelected.fhasta}
							weekStart={1}
							language="es-ES"
							datepicker-format="dd/mm/yyyy"
							labelTodayButton="Hoy"
							labelClearButton="Limpiar"
							onSelectedDateChanged={(date) => {
								setDataSelected({ ...dataSelected, "fhasta": new Date(date).toISOString().split('T')[0] })
							}}
						/>
					</div>
				</div>
				<div className="mt-2 flex justify-end">
					<Button type="submit">Buscar</Button>
				</div>
			</form>
		</div>
	);
};

Filtro.propTypes = {
	onChange: PropTypes.func
};

export default Filtro;
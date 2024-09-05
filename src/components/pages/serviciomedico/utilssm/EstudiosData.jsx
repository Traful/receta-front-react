import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Label, Textarea, Button } from "flowbite-react";

const EstudiosData = ({ estudios, onEstudiosChange }) => {
	const [data, setData] = useState([]);
	const [txt, setTxt] = useState("");

	useEffect(() => {
		setData(estudios);
	}, [estudios]);


	const handleRemoveEstudio = (index) => {
		let newEstudios = [...estudios];
		newEstudios.splice(index, 1);
		onEstudiosChange(newEstudios);
		
	};

	const handleAddEstudio = () => {
		let newEstudios = [...estudios, txt];
		onEstudiosChange(newEstudios);
		setTxt("");
	};

	return(
		<div className="EstudiosData">
			<div>
				<ul>
					{
						data.map((e, i) => <li key={`e-${i}`} className="my-4 p-2 bg-green-300 rounded-md">
							<div className="flex justify-between items-center gap-1">
								<p>{e}</p>
								<Button onClick={() => handleRemoveEstudio(i)}>Eliminar</Button>
							</div>
						</li>)
					}
				</ul>
			</div>
			<div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="txt" value="Estudio" />
					</div>
					<Textarea id="txt" name="txt" rows={4} value={txt} onChange={e => setTxt(e.target.value)} />
				</div>
				<div className="mt-4 flex justify-end">
					<Button type="button" onClick={handleAddEstudio}>Agregar</Button>
				</div>
			</div>
		</div>
	);
};

EstudiosData.propTypes = {
	estudios: PropTypes.array,
	onEstudiosChange: PropTypes.func
};

export default EstudiosData;
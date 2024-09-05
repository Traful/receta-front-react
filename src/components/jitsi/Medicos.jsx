const dataMedicos = [
	{ id: 1, nombre: "Mario", email: "marioantonioluna@gmail.com" },
	{ id: 2, nombre: "Federico", email: "federiconj@gmail.com" },
	{ id: 3, nombre: "Hans", email: "hansjal@gmail.com" }
];

const Medicos = ({ onMedicoSelected }) => {
	return(
		<div className="Medicos">
			<h1 className="mb-4">Iniciar consulta Remota con:</h1>
			<ul>
				{
					dataMedicos.map(m => <li className="cursor-pointer p-2 mb-2 border-2 border-gray-500 rounded hover:bg-green-400" key={`m-${m.id}`} onClick={() => onMedicoSelected(m)}>Dr/a {m.nombre}</li>)
				}
			</ul>
		</div>
	);
};

export default Medicos;
import { useState } from "react";
import useForm from "../../../utils/useForm";
import { Modal, Button, Label, TextInput, Table } from "flowbite-react";
import { HiOutlineUserAdd } from "react-icons/hi";

const defaultData = {
	nombre: "",
	apellido: "",
	dni: "",
	fechaNacimiento: new Date().toISOString().split('T')[0],
	telefono: "",
	email: "",
	password: "",
	rpassword: ""
};

const Asistentes = () => {
	const [openModal, setOpenModal] = useState(false);
	const [asistentes, setAsistentes] = useState([
		{
			nombre: "Hans",
			apellido: "Araujo",
			dni: "18827252",
			fechaNacimiento: "1978-03-14",
			telefono: "2657229947",
			email: "hansjal@gmail.com",
			password: "quilmes",
			rpassword: "quilmes"
		}
	]);
	const { data, handleChange } = useForm(defaultData);


	const handleSubmit = (event) => {
		event.preventDefault();
		setAsistentes([...asistentes, data]);
		setOpenModal(false);
	};

	return (
		<div className="Asistentes">
			<h1 className="text-gray-400 uppercase font-bold text-xs">Asistentes</h1>
			<Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>Nuevo Asistente</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-2 mb-2 md:flex-row">
							<div className="grow">
								<Label className="mb-2 block" htmlFor="apellido" value="Apellido" />
								<TextInput id="apellido" name="apellido" type="text" placeholder="Doe" value={data.apellido} onChange={handleChange} required />
							</div>
							<div className="grow">
								<Label className="mb-2 block" htmlFor="nombre" value="Nombre" />
								<TextInput id="nombre" name="nombre" type="text" placeholder="John" value={data.nombre} onChange={handleChange} required />
							</div>
						</div>
						<div className="flex flex-col gap-2 mb-2 md:flex-row">
							<div className="grow">
								<Label className="mb-2 block" htmlFor="dni" value="Nro. Documento" />
								<TextInput id="dni" name="dni" type="number" placeholder="26199345" value={data.dni} onChange={handleChange} required />
							</div>
							<div className="grow">
								<Label className="mb-2 block" htmlFor="fechaNacimiento" value="F. Nacimiento" />
								<TextInput id="fechaNacimiento" name="fechaNacimiento" type="date" placeholder="26199345" value={data.fechaNacimiento} onChange={handleChange} required />
							</div>
							<div className="grow">
								<Label className="mb-2 block" htmlFor="telefono" value="Teléfono" />
								<TextInput id="telefono" name="telefono" type="number" placeholder="2657229947" value={data.telefono} onChange={handleChange} required />
							</div>
						</div>
						<div className="grow">
							<Label className="mb-2 block" htmlFor="email" value="E-Mail" />
							<TextInput id="email" name="email" type="email" placeholder="johndoe@server.com" value={data.email} onChange={handleChange} required />
						</div>
						<div className="flex flex-col gap-2 mb-2 md:flex-row">
							<div className="grow">
								<Label className="mb-2 block" htmlFor="password" value="Contraseña" />
								<TextInput id="password" name="password" type="password" placeholder="123" value={data.password} onChange={handleChange} required />
							</div>
							<div className="grow">
								<Label className="mb-2 block" htmlFor="rpassword" value="Repetir Contraseña" />
								<TextInput id="rpassword" name="rpassword" type="password" placeholder="123" value={data.rpassword} onChange={handleChange} required />
							</div>
						</div>
						<div className="flex justify-end mt-4 gap-2">
							<Button color="warning" onClick={() => setOpenModal(false)}>Cancelar</Button>
							<Button type="submit">Agregar</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<div className="flex justify-end mb-4">
				<Button onClick={() => setOpenModal(true)}><HiOutlineUserAdd /></Button>
			</div>
			<Table>
				<Table.Head>
					<Table.HeadCell>Apellido y Nombre</Table.HeadCell>
					<Table.HeadCell>Teléfono</Table.HeadCell>
					<Table.HeadCell>E-Mail</Table.HeadCell>
					<Table.HeadCell><span className="sr-only">Editar</span></Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{
						asistentes.map((a, i) => {
							return (
								<Table.Row key={`r-${i}${a.email}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
									<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{`${a.apellido} ${a.nombre}`}</Table.Cell>
									<Table.Cell>{a.telefono}</Table.Cell>
									<Table.Cell>{a.email}</Table.Cell>
									<Table.Cell><a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Editar</a></Table.Cell>
								</Table.Row>
							)
						})
					}
				</Table.Body>
			</Table>
		</div>
	);
};

export default Asistentes;
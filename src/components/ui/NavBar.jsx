import { useContext, useEffect, useState } from "react";
import Contexto from "../../store/Contexto";
import Logo from "./Logo";
import { RESET } from "../../store/constantes";
import { VITE_API_BASE_URL } from "./../../config";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

/* <Avatar alt="User settings" img={foto ? `data:image/jpeg;base64,${foto}` : null} rounded /> */

const NavBar = () => {
	const contexto = useContext(Contexto);
	const [foto, setFoto] = useState(null);

	useEffect(() => {
		const getFoto = async () => {
			let response = await fetch(`${VITE_API_BASE_URL}statics/foto/fo_${contexto.state.user.matricula}.txt`);
			if(response.ok) {
				let blobFoto = await response.blob();

				let reader = new FileReader();
				reader.readAsDataURL(blobFoto);
				reader.onloadend = () => {
					setFoto(reader.result);
				};
			}
		};
		getFoto();
	}, [contexto.state.user.matricula]);

	const handleCloseSession = () => {
		contexto.dispatch({ type: RESET });
	};

	return(
		<Navbar fluid className="mb-4 shadow-md">
			<Navbar.Brand href="http://localhost:5173/">
				<Logo widthl={130} colorOne="#2d9f03" colorTwo="#4f4f4f" />
			</Navbar.Brand>
			<div className="flex md:order-2">
				<Dropdown arrowIcon={false} inline label={
					<Avatar alt="User settings" img={foto ? foto : null} rounded />
				}>
					<Dropdown.Header>
						<span className="block text-sm">{contexto.state.user.apellido}, {contexto.state.user.nombre}</span>
						<span className="block truncate text-sm font-medium">{contexto.state.user.matricula} [{contexto.state.user.rematriculado}]</span>
					</Dropdown.Header>
					<Dropdown.Item>Perfil</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={handleCloseSession}>Cerrar Sesión</Dropdown.Item>
				</Dropdown>
				{ /* <Navbar.Toggle /> */ }
			</div>
			{/*
			<Navbar.Collapse>
				<Navbar.Link href="#" active>Home</Navbar.Link>
				<Navbar.Link href="#">About</Navbar.Link>
				<Navbar.Link href="#">Services</Navbar.Link>
				<Navbar.Link href="#">Pricing</Navbar.Link>
				<Navbar.Link href="#">Contact</Navbar.Link>
			</Navbar.Collapse>
			*/}
		</Navbar>
	);
};

export default NavBar;
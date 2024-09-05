import { useContext } from "react";
import Contexto from "../../store/Contexto";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiOutlineLink, HiChartPie, HiShoppingBag, HiInbox } from "react-icons/hi";
import { Link } from "react-router-dom";
import { RESET } from "../../store/constantes";

const SideBar = () => {
	const contexto = useContext(Contexto);

	const handleCloseSession = () => {
		contexto.dispatch({ type: RESET });
	};

	return (
		<Sidebar className="hidden md:block h-auto mb-4" aria-label="Sidebar with multi-level dropdown example">
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Collapse icon={HiChartPie} label="Gestión Administrativa">
						<li><Link to="/gesadmin/auto" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Inicio Autogestión</Link></li>
					</Sidebar.Collapse>
					<Sidebar.Collapse icon={HiShoppingBag} label="Servicio Médico">
						<li><Link to="/servmedico/prereceta" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Prescribir Receta</Link></li>
						<li><Link to="/servmedico/estudios" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Estudios Complementarios</Link></li>
					</Sidebar.Collapse>
					<Sidebar.Collapse icon={HiInbox} label="Telemedicina">
						<li><Link to="tele/meetings" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Reuniones</Link></li>
						{ /*
						<li><Link to="/tele/turnos" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Turnos</Link></li>
						<li><Link to="/tele/asistentes" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Asistentes</Link></li>
						*/ }
					</Sidebar.Collapse>
					<Sidebar.Collapse icon={HiInbox} label="Pacientes">
						<li><Link to="/pacientes/recetas" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Recetas</Link></li>
						<li><Link to="/pacientes/certificados" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Certificado Médico</Link></li>
						<li><Link to="/pacientes/estudios" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Estudios Complementarios</Link></li>
						<li><Link to="/pacientes/pacientes" className="p-2 inline-block text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75">Pacientes</Link></li>
					</Sidebar.Collapse>
					<Sidebar.Item href="https://soporte.cmpc.org.ar/" target="_blank" rel="noopener noreferrer" icon={HiOutlineLink}>Soporte</Sidebar.Item>
					<button className="flex gap-2" onClick={handleCloseSession}><HiArrowSmRight className="ml-2 h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />Cerrar Sesión</button>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
};

export default SideBar;
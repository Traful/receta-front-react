import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import { Outlet } from "react-router-dom";

/*
import IncomingMeetings from "../webex/IncomingMeetings";
import Members from "../webex/Members";
import RemoteVideo from "../webex/RemoteVideo";
*/

const Dashboard = () => {
	return(
		<div className="min-h-screen flex flex-col gap-2">
			<NavBar />
			<div className="flex gap-2 grow">
				<div>
					<SideBar />
					{/* 
					<IncomingMeetings />
					<Members />
					*/ }
				</div>
				<div className="relative bg-gray-50 w-full rounded mr-1 p-2">
					<Outlet />
					{/* <RemoteVideo /> */ }
				</div>
			</div>
			<div className="mt-2 p-8 bg-gray-800 text-white text-center">&copy; Consejo de Médicos de la Provincia de Córdoba</div>
		</div>
	);
};

export default Dashboard;
import { useEffect, useState } from "react";
import { VITE_API_BASE_URL } from "../../config";

const useJistiToken = (dataReunion) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const getToken = async () => {
			try {
				let response = await fetch(`${VITE_API_BASE_URL}jitsi/token`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataReunion)
				});
				let json = await response.json();
				if(json.ok) {
					setToken(json.token);
				} else {
					setError(json.msg);
				}
			} catch(error) {
				setError(error.message);
			}
		};
		if(dataReunion) getToken().finally(setLoading(false));
	}, [dataReunion]);

	return { loading, error, token };
};

export default useJistiToken;
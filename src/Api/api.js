import { useContext, useState } from "react";
import Contexto from "./../store/Contexto";
import { VITE_API_BASE_URL } from "./../config";

const defaultState = {
	signal: null,
	proceessing: false
};

const updateSignalState = (setEstado) => {
	let controller = new AbortController();
	let signal = controller.signal;
	setEstado({
		...defaultState,
		signal: signal,
		proceessing: true
	});
	return signal;
};

export const useApi = () => {
	const contexto = useContext(Contexto);
	const [estado, setEstado] = useState(defaultState);

	const apiGet = async (resource) => {
		let signal = updateSignalState(setEstado);
		let response = await fetch(`${VITE_API_BASE_URL}${resource}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${contexto.state.user.token}`
			},
			signal: signal
		});
		let json = await response.json();
		setEstado(defaultState);
		if(!response.ok) {
			throw new Error(json?.message || response.message);
		}
		return json;
	};

	const apiPost = async (resource, data) => {
		let resp = {
			ok: false,
			msg: "",
			data: null,
			errores: []
		};
		try {
			let signal = updateSignalState(setEstado);
			let response = await fetch(`${VITE_API_BASE_URL}${resource}`, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${contexto.state.user.token}`
				},
				signal: signal
			});
			let json = await response.json();
			setEstado(defaultState);
			return json;
		} catch (error) {
			resp.msg = error.message;
		}
		return resp;
	};

	const apiPut = async (resource, data, method = "PUT") => {
		let signal = updateSignalState(setEstado);
		let response = await fetch(`${VITE_API_BASE_URL}${resource}`, {
			method: method,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${contexto.state.user.token}`
			},
			signal: signal
		});
		let json = await response.json();
		setEstado(defaultState);
		return json;
	};

	const apiPatch = (resource, data) => {
		return apiPut(resource, data, "PATCH");
	};

	const apiDelete = async (resource) => {
		let signal = updateSignalState(setEstado);
		let response = await fetch(`${VITE_API_BASE_URL}${resource}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${contexto.state.user.token}`
			},
			signal: signal
		});
		let json = await response.json();
		setEstado(defaultState);
		return json;
	};

	return { apiGet, apiPost, apiPut, apiPatch, apiDelete, signal: estado.signal, proceessing: estado.proceessing };
};
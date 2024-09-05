import { useEffect, useState } from "react";

const useForm = (defaultFormData) => {
	const [data, setData] = useState(defaultFormData);

	useEffect(() => {
		setData(defaultFormData);
	}, [defaultFormData]);

	const handleChange = (e) => {
		let field = e.target.name;
		let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setData({ ...data, [field]: value });
	};

	return { data, handleChange };
};

export default useForm;
import React from "react";

// A continuación se itera sobre cada objeto de error y se imprime
// en una lista no ordenada
const Errors = props => {
	const { errors } = props;
	return (
		<div>
			<ul>
				{errors.map(errors => <li key={errors.time}>{errors.body}</li>)}
			</ul>
		</div>
	);
};

export default Errors;

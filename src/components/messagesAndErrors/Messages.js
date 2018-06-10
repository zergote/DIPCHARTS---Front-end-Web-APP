import React from "react";

// A continuación se itera sobre cada objeto de mensaje y se imprime
// en una lista no ordenada
const Messages = props => {
	const { messages } = props;
	return (
		<div>
			<ul>
				{messages.map(message => (
					<li key={message.time}>{message.body}</li>
				))}
			</ul>
		</div>
	);
};

export default Messages;

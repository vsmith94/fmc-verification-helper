import React from "react";

interface Props {
	totals: Map<string, number>;
}

interface State {}

export class Totals extends React.Component<Props, State> {

	render() {
		const iter = this.props.totals.entries();
		const lines = [];

		let entry = iter.next();
		while (entry.done !== true) {
            lines.push(
                <div key={Math.random()}>{entry.value[0]} {entry.value[1]}</div>
            )
            entry = iter.next();
		}

		return <div>{lines}</div>;
	}
}

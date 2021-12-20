import React from "react";
//TODO: NOT USED. POSSIBLY DELETE?
type Props = {
	items: [];
};

export class ListElement extends React.Component<Props> {
	render() {
		return (
			<React.Fragment>
				<div className="item-upc"></div>
				<ul>
					{this.props.items.map((item) => {
						return <li>{item}</li>;
					})}
				</ul>
			</React.Fragment>
		);
	}
}

import React from "react";

import classes from "./PageCard.module.css";

type Props = {
	title?: string;
};

export class PageCard extends React.Component<Props> {
	render() {
		return (
			<div className={classes.pagecard}>
				<h2>{this.props.title}</h2>
				<div className={classes.item_container}>{this.props.children}</div>
			</div>
		);
	}
}

import React from "react";
import { PageCard } from "./UI/PageCard";

import classes from "./DeployArea.module.css";
import { Item } from "./Item";
import { ItemObject } from "../App";

type Props = {
	onDrop: Function;
};

export class DeployArea extends React.Component<Props> {
	render() {
		return (
			<React.Fragment>
				<div
					className={classes.deployarea}
					onDragOver={(event) => {
						// Needs this to stop file from being loaded in the browser. For some reason.
						event.stopPropagation();
						event.preventDefault();
					}}
					onDrop={(event) => {
						event.stopPropagation();
						event.preventDefault(); // Stop file from being opened.
						this.props.onDrop(event);
					}}
				>
					<PageCard title="Items">
						<Item upc={123456789} tags={[]}></Item>
						<Item upc={123456789} tags={[]}></Item>
						<Item upc={123456789} tags={[]}></Item>
						<Item upc={123456789} tags={[]}></Item>
					</PageCard>
					<PageCard title="Totals"></PageCard>
					<PageCard title="Tickets/Signs"></PageCard>
				</div>
			</React.Fragment>
		);
	}
}

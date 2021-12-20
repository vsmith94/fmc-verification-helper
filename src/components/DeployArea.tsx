import React from "react";
import { PageCard } from "./UI/PageCard";

import classes from "./DeployArea.module.css";
import { Item } from "./Item";

type Props = {
};

interface State {
	fileContent: string;
}

export type ItemObject = {
	id: number;
	upc: number;
	tags: Tag[];
};

export enum Tag {
	WRONG_PRICE_TICKET,
	WRONG_PRICE_SIGN,
	MISSING_TICKET,
	MISSING_SIGN,
	LARGE,
	SMALL,
	I9,
	I12,
	DELETE,
}

export class DeployArea extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			fileContent: '',
		};
	}

	onFileDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		const file = event.dataTransfer?.files[0];
		file?.text().then((result) => {
			this.setState({
				fileContent : result
			});
			this.processFile(result);
		});
	};

	/**
	 * Process data acquired from the file. Creates an ItemObject based on each line in the string, including initial tags and UPC, and adds it to ItemObject[]
	 * that is returned after all lines are processed.
	 * @param data String input of the data read from the file
	 * @returns ItemObject array with all the ItemObject created based on the parameter
	 */
	processFile = (data: String): ItemObject[] => {
		const itemObjects: ItemObject[] = [];
		const lines = data.split(/\r?\n/);
		lines.forEach((line) => {
			const rawLine = line.split(" ");
			const upc = rawLine[4];
			const tags: Tag[] = [];

			//Get tags
			rawLine.splice(6).forEach((tag) => {
				switch (tag) {
					case "wp":
						tags.push(Tag.WRONG_PRICE_TICKET);
						break;
					case "ws":
						tags.push(Tag.WRONG_PRICE_SIGN);
						break;
					case "mt":
						tags.push(Tag.MISSING_TICKET);
						break;
					case "ms":
						tags.push(Tag.MISSING_SIGN);
						break;
					case "l":
						tags.push(Tag.LARGE);
						break;
					case "s":
						tags.push(Tag.SMALL);
						break;
					case "i9":
						tags.push(Tag.I9);
						break;
					case "12":
						tags.push(Tag.I12);
						break;
					case "del":
						tags.push(Tag.DELETE);
						break;
				}
			});
			itemObjects.push({
				id: Math.random(),
				upc: Number.parseInt(upc),
				tags: [...tags],
			});
		});

		//Remove last line as its always empty.
		itemObjects.pop();
		console.log(itemObjects);
		return itemObjects;
	};

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
						this.onFileDropHandler(event);
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

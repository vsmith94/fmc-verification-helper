import React from "react";
import { PageCard } from "./UI/PageCard";

import classes from "./DeployArea.module.css";
import { Item } from "./Item";
import { Totals } from "./Totals";

interface Props {}

interface State {
	fileContent: string;
	itemObjects: ItemObject[];
	totals: Map<string, number>;
}

export type ItemObject = {
	key: number;
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
			fileContent: "",
			itemObjects: [],
			totals: new Map<string, number>(),
		};
	}

	onFileDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
		const file = event.dataTransfer?.files[0];
		file?.text().then((result) => {
			this.setState({
				fileContent: result,
				itemObjects: this.processFile(result),
			},() =>{ //updateTotals uses itemsObjects so this is called later.
				this.setState({
					totals: this.updateTotals()
				});
			});
		});
	};

	updateTotals(): Map<string, number> {
		const map = new Map<string, number>();
		Object.keys(Tag).forEach((tag) => {
			map.set(tag, 0);
		});

		console.log(this.state.itemObjects);
		this.state.itemObjects.forEach((item) => {
			item.tags.forEach((itemTag) => {
				let currValue = map.get(Tag[itemTag]) || 1; // I don't know why but this is messy, but its the only it stop complaning.
				map.set(Tag[itemTag], currValue + 1 || 1);
			});
		});

		console.log(map);
		return map;
	}

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
				key: Math.random(),
				upc: Number.parseInt(upc),
				tags: [...tags],
			});
		});

		//Remove last line as its always empty.
		itemObjects.pop();
		
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
						{this.state.itemObjects.map((itemObject) => {
							return (
								<Item
									key={itemObject.key}
									upc={itemObject.upc}
									tags={itemObject.tags}
								/>
							);
						})}
					</PageCard>
					<PageCard title="Totals">
						<Totals
							totals={this.state.totals}
						></Totals>
					</PageCard>
					<PageCard title="Tickets/Signs"></PageCard>
				</div>
			</React.Fragment>
		);
	}
}

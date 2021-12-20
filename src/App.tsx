import React, { useState } from "react";
import { DeployArea } from "./components/DeployArea";

//TODO: May put this on DeployArea instead?
export type ItemObject = {
	id: number;
	upc: number;
	tags: Tag[];
};

//TODO: May put this on DeployArea instead?
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

function App() {
	const [fileContent, setFileContent] = useState("");

	const onFileDropHandler = (event: DragEvent) => {
		const file = event.dataTransfer?.files[0];
		file?.text().then((result) => {
			setFileContent(result);
			processFile(result);
		});
	};

	/**
	 * Process data acquired from the file. Creates an ItemObject based on each line in the string, including initial tags and UPC, and adds it to ItemObject[]
   * that is returned after all lines are processed.
	 * @param data String input of the data read from the file
	 * @returns ItemObject array with all the ItemObject created based on the parameter
	 */
	const processFile = (data: String): ItemObject[] => {
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

	return (
		<React.Fragment>
			<header>
				<h1>FMC Verification Helper</h1>
			</header>
			<DeployArea onDrop={onFileDropHandler}></DeployArea>
		</React.Fragment>
	);
}

export default App;

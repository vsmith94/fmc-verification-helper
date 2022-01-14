import React from "react";
import { Tag } from "../components/DeployArea";
import { TagElement } from "./TagElement";

import classes from "./Item.module.css";

type Props = {
    key: Number;
	upc: Number | String;
	tags: Tag[];
};

type State = {
	tags: Tag[];
};

export class Item extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			tags: [...this.props.tags],
		};
	}

	render() {
		//TODO: Get all tags in the prop and dynamically fill that.
		return (
			<div className={classes.row}>
				<div className={classes.upc}>{this.props.upc}</div>
				<div className={classes.tags}>
					{this.state.tags.map((tag) => {
						return (
							<div key={Math.random()} className={classes.tag_container}>
								<TagElement tag={tag} />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

import React from "react";
import { Tag } from "../App";

import classes from "./Tag.module.css";

type Props = {
	tag: Tag;
};

export class TagElement extends React.Component<Props> {
	classCSS = '';
	tagText = '';
	
	selectCSSClass() {
		switch (this.props.tag) {
			case Tag.MISSING_TICKET:
				this.classCSS = "missing-ticket";
				this.tagText = 'Missing Ticket'
				break;
			case Tag.MISSING_SIGN:
				this.classCSS = "missing-sign";
				this.tagText = 'Missing Sign'
				break;
			case Tag.WRONG_PRICE_TICKET:
				this.classCSS = "ticket-wrong-price";
				this.tagText = 'Ticket Wrong Price'
				break;
			case Tag.WRONG_PRICE_SIGN:
				this.classCSS = "sign-wrong-price";
				this.tagText = 'Sign Wrong Price'
				break;
			case Tag.LARGE:
				this.classCSS = "large";
				this.tagText = 'Large';
				break;
			case Tag.SMALL:
				this.classCSS = "small";
				this.tagText = 'Small';
				break;
			case Tag.I9:
				this.classCSS = "nine";
				this.tagText = 'I9';
				break;
			case Tag.I12:
				this.classCSS = "twelve";
				this.tagText = 'I12';
				break;
			case Tag.DELETE:
				this.classCSS = "del";
				this.tagText = 'Del';
				break;
			default:
				this.classCSS = "error";
				this.tagText = 'error'
				break;
		}
	}

	render() {
		this.selectCSSClass();
		return <div className={classes.tag + ' ' + classes[this.classCSS]}>{this.tagText}</div>;
	}
}

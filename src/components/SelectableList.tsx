import * as React from "react";

import List, { ListProps } from "material-ui/List/List";
import ListItem, { ListItemProps } from "material-ui/List/ListItem";

import withStyles, { WithStyles } from "material-ui/styles/withStyles";

const styles = {
	selectedItem: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
	} as React.CSSProperties,
};

export interface ISelectableListItemProps<T> extends ListItemProps {
	selectValue: T;
}

export interface ISelectableListProps<T> extends ListProps {
	children: React.ReactElement<ISelectableListItemProps<T>>
	| boolean | null | undefined
	| Array<React.ReactElement<ISelectableListItemProps<T>> | boolean | null | undefined>;
	value?: T;
	onChangeSelectable?(e: React.MouseEvent<any>, value: T): void;
}

class SelectableList<T> extends React.Component<ISelectableListProps<T> & WithStyles<keyof typeof styles>> {
	protected keyIndex!: number;

	public render() {
		const {
			children,
			value, onChangeSelectable,
			classes,
			...rest,
		} = this.props;

		const {
			selectedItem: selectedItemClassName,
			...restClasses,
		} = classes;

		this.keyIndex = 0;

		return (
			<List {...rest} classes={restClasses}>
				{React.Children.map(children, (child) => (
					this.extendChild(child, selectedItemClassName)
				))}
			</List>
		);
	}

	protected extendChild(child: React.ReactChild, selectedItemClassName: string) {
		if (child && this.isListItem(child)) {
			const selected = this.isChildSelected(child, this.props);

			const mergedChildrenStyles = child.props.style;

			this.keyIndex += 1;

			return React.cloneElement<ISelectableListItemProps<T>, Partial<ISelectableListItemProps<T>>>(child, {
				className: `${child.props.className || ""} ${selected ? selectedItemClassName : ""}`,
				// key: this.keyIndex,
				onClick: (event: React.MouseEvent<any>) => {
					this.handleItemClick(event, child);
					if (child.props.onClick) {
						(child.props.onClick as React.EventHandler<React.MouseEvent<any>>)(event);
					}
				},
				style: mergedChildrenStyles,
			});
		}
		return child;
	}

	protected isListItem(el: React.ReactChild): el is React.ReactElement<ISelectableListItemProps<T>> {
		return (el as React.ReactElement<any>).type === SelectableListItem;
	}

	protected isChildSelected(child: React.ReactElement<ISelectableListItemProps<T>>, props: ISelectableListProps<T>) {
		return props.value === child.props.selectValue;
	}

	protected handleItemClick(event: React.MouseEvent<any>, item: React.ReactElement<ISelectableListItemProps<T>>) {
		const itemValue = item.props.selectValue;

		if (itemValue !== this.props.value) {
			if (this.props.onChangeSelectable) {
				this.props.onChangeSelectable(event, itemValue);
			}
		}
	}
}

export class SelectableListItem<T> extends React.Component<ISelectableListItemProps<T>> {
	public render() {
		const { selectValue, ...rest } = this.props;
		return <ListItem button {...rest} />;
	}
}

export default withStyles(styles)(SelectableList);
